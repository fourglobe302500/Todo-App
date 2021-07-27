import React, { DragEventHandler, useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { TodoList } from "./components/TodoList";
import { State, Task, Todo } from "./Types";

export const App = () => {
  const [state, setState] = useState<State>(
    JSON.parse(
      localStorage.getItem("fgTL") || '{"Todos":[],"Doings":[],"Dones":[]}',
    ),
  );

  const [loadingNewData, setLoadingNewData] = useState(false);
  const [invallidNewData, setInvallidNewData] = useState(false);
  const [newData, setNewData] = useState("");

  const commitTodo =
    (maker: (todo: Todo | null) => State) =>
    (todo: Todo | null): void => {
      setState(maker(todo));

      const checkTask = (task: Task, i: number): Task => {
        if (task.childrenTasks.length === 0) return task;
        const childrenTasks = task.childrenTasks.map(checkTask);
        const done = childrenTasks
          .map((t) => t.done)
          .reduce((b, v) => b && v, true);
        return {
          ...task,
          childrenTasks,
          done,
          manualShowChildren:
            task.manualShowChildren === task.autoShowChildren
              ? !done
              : task.manualShowChildren,
          autoShowChildren: !done,
        };
      };

      const checkTodo = (todo: Todo, i: number) => {
        if (todo.tasks.length === 0) return todo;
        const tasks = todo.tasks.map(checkTask);
        const done = tasks.map((t) => t.done).reduce((b, v) => b && v, true);
        return {
          ...todo,
          tasks,
          done,
          manualShowChildren:
            todo.manualShowChildren === todo.autoShowChildren
              ? !done
              : todo.manualShowChildren,
          autoShowChildren: !done,
        };
      };

      setState((s) => ({
        Todos: s.Todos.map(checkTodo),
        Doings: s.Doings.map(checkTodo),
        Dones: s.Dones.map(checkTodo),
      }));

      const emptyTask = (task: Task): boolean =>
        (!task.done && task.childrenTasks.every((task) => emptyTask(task))) ||
        (!task.done && task.childrenTasks.length === 0);

      const empty = (todo: Todo) =>
        (!todo.done && todo.tasks.every((task) => emptyTask(task))) ||
        (!todo.done && todo.tasks.length === 0);

      const doing = (todo: Todo) =>
        !todo.done && todo.tasks.some((task) => !emptyTask(task));

      setState((s) => ({
        Todos: [
          ...s.Todos.filter(empty),
          ...s.Dones.filter(empty),
          ...s.Doings.filter(empty),
        ],

        Doings: [
          ...s.Doings.filter(doing),
          ...s.Todos.filter(doing),
          ...s.Dones.filter(doing),
        ],

        Dones: [
          ...s.Dones.filter((todo) => todo.done),
          ...s.Todos.filter((todo) => todo.done),
          ...s.Doings.filter((todo) => todo.done),
        ],
      }));
    };

  useEffect(() => {
    localStorage.setItem("fgTL", JSON.stringify(state));
    return () => {};
  }, [state]);

  const href = () =>
    URL.createObjectURL(
      new Blob([JSON.stringify(state, undefined, 2)], {
        type: "application/json",
      }),
    );

  const validateData = (data: string) => {
    try {
      JSON.parse(data);
      setLoadingNewData(true);
    } catch (ex) {
      setInvallidNewData(true);
    }
  };

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length === 1) {
      const file = files[0];
      const fr = new FileReader();
      fr.addEventListener("load", () => {
        setNewData(() => {
          validateData(fr.result as string);
          return fr.result as string;
        });
      });
      fr.addEventListener("error", () => {
        setInvallidNewData(true);
      });
      fr.readAsText(file);
      e.dataTransfer.clearData();
      return;
    }
    e.dataTransfer.clearData();
    setInvallidNewData(true);
  };

  return (
    <>
      {loadingNewData || invallidNewData ? (
        <div className="dialoge">
          {loadingNewData ? (
            <div className="loading-new-content">
              <div className="content">
                <h1 className="warning">
                  Loading external files will delete current todos
                </h1>
                <div className="buttons">
                  <button
                    className="ok"
                    onClick={() => {
                      setLoadingNewData(false);
                      setState(JSON.parse(newData));
                      setNewData("");
                    }}
                  >
                    Ok
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      setLoadingNewData(false);
                      setNewData("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {invallidNewData ? (
            <div className="invallid-new-content">
              <div className="content">
                <h1 className="warning">Invallid JSON format</h1>
                <div className="buttons">
                  <button
                    className="ok"
                    onClick={() => {
                      setInvallidNewData(false);
                      setNewData("");
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="download">
        <a href={href()} download="todo-list.json">
          <FaFileDownload />
        </a>
      </div>
      <div
        className="App"
        onDrop={handleDrop}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <TodoList
          state="todos"
          todos={state.Todos}
          commitTodo={commitTodo}
          make={(todos) => ({ ...state, Todos: todos })}
        />
        <TodoList
          state="doings"
          todos={state.Doings}
          commitTodo={commitTodo}
          make={(todos) => ({ ...state, Doings: todos })}
        />
        <TodoList
          state="dones"
          todos={state.Dones}
          commitTodo={commitTodo}
          make={(todos) => ({ ...state, Dones: todos })}
        />
      </div>
    </>
  );
};
