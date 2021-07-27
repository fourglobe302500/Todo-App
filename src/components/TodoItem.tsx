import React from "react";
import { Task, Todo } from "../Types";
import { ItemBar } from "./ItemBar";
import { TaskList } from "./TaskList";

interface TodoItemProps {
  readonly todo: Todo;
  readonly isLast: boolean;
  readonly commitTodo: (todo: Todo | null) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isLast,
  commitTodo,
}) => {
  const { tasks, done, msg, manualShowChildren, editing } = todo;

  const toogleTodo = () =>
    commitTodo({
      ...todo,
      done: !done,
    });

  const toogleShowChildren = () =>
    commitTodo({ ...todo, manualShowChildren: !manualShowChildren });

  const changeEditing = (to: boolean) => commitTodo({ ...todo, editing: to });

  const commitMsg = (msg: string) =>
    commitTodo({ ...todo, msg, editing: false });

  const commitTask =
    (make: (task: Task | null) => Todo) => (task: Task | null) =>
      commitTodo(make(task));

  const commitChildren = () =>
    commitTodo({
      ...todo,
      tasks: [
        ...tasks,
        {
          msg: "",
          done: false,
          editing: true,
          manualShowChildren: true,
          autoShowChildren: true,
          childrenTasks: [],
        },
      ],
    });

  const deleteSelf = () => commitTodo(null);

  return (
    <div className={"item item-todo" + (isLast ? " last-item" : "")}>
      <ItemBar
        done={done}
        childrenLength={tasks.length}
        toogleShowChildren={toogleShowChildren}
        toogle={toogleTodo}
        showChildren={manualShowChildren}
        msg={msg}
        place="todo"
        changeEditing={changeEditing}
        editing={editing}
        commitMsg={commitMsg}
        commitChildren={commitChildren}
        deleteSelf={deleteSelf}
      />
      <TaskList
        tasks={tasks}
        showChildren={manualShowChildren}
        commitTask={commitTask}
        maker={(tasks) => ({ ...todo, tasks })}
      />
    </div>
  );
};
