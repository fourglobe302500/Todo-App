import React from "react";
import { Task } from "../Types";
import { ItemBar } from "./ItemBar";
import { TaskList } from "./TaskList";

interface TaskItemProps {
  readonly task: Task;
  readonly isLast: boolean;
  readonly commitTask: (task: Task | null) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isLast,
  commitTask,
}) => {
  const { done, msg, childrenTasks, manualShowChildren, editing } = task;

  const commitChildTask =
    (make: (t: Task | null) => Task) => (task: Task | null) =>
      commitTask(make(task));

  const toogleTask = () =>
    commitTask({
      ...task,
      done: !done,
    });

  const changeEditing = (editing: boolean) => commitTask({ ...task, editing });

  const commitMsg = (msg: string) =>
    commitTask({ ...task, msg, editing: false });

  const toogleShowChildren = () =>
    commitTask({ ...task, manualShowChildren: !manualShowChildren });

  const commitChildren = () =>
    commitTask({
      ...task,
      childrenTasks: [
        ...childrenTasks,
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

  const deleteSelf = () => commitTask(null);

  return (
    <div className={"item item-task" + (isLast ? " last-item" : "")}>
      <ItemBar
        done={done}
        childrenLength={childrenTasks.length}
        toogleShowChildren={toogleShowChildren}
        toogle={toogleTask}
        showChildren={manualShowChildren}
        msg={msg}
        place="task"
        changeEditing={changeEditing}
        editing={editing}
        commitMsg={commitMsg}
        commitChildren={commitChildren}
        deleteSelf={deleteSelf}
      />
      <TaskList
        tasks={childrenTasks}
        showChildren={manualShowChildren}
        commitTask={commitChildTask}
        maker={(tasks) => ({ ...task, childrenTasks: tasks })}
      />
    </div>
  );
};
