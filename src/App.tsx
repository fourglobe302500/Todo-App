import React, { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { TodoList } from "./components/TodoList";
import { State, Task, Todo } from "./Types";

export const App = () => {
  const newTask = (
    msg: string,
    childrenTasks = [] as Task[],
    done = false,
    manualShowChildren = true,
  ): Task => ({
    msg,
    done,
    childrenTasks,
    manualShowChildren,
    autoShowChildren: manualShowChildren,
    editing: false,
  });

  const newTodo = (
    msg: string,
    tasks = [] as Task[],
    done = false,
    manualShowChildren = true,
  ): Todo => ({
    msg,
    done,
    tasks,
    manualShowChildren,
    autoShowChildren: manualShowChildren,
    editing: false,
  });

  const [state, setState] = useState<State>(
    JSON.parse(
      localStorage.getItem("fgTL") || '{"Todos":[],"Doings":[],"Dones":[]}',
    ),
  );

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

  const href = () => {
    const json = JSON.stringify(state);
    const blob = new Blob([json], { type: "application/json" });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <div className="download">
        <a href={href()} download="todo-list.json">
          <FaFileDownload />
        </a>
      </div>
      <div className="App">
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
