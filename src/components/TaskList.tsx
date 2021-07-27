import React from "react";
import { Task } from "../Types";
import { TaskItem } from "./TaskItem";

interface TaskListProps<T> {
  readonly tasks: Task[];
  readonly showChildren: boolean;
  readonly commitTask: (
    make: (t: Task | null) => T,
  ) => (task: Task | null) => void;
  readonly maker: (tasks: Task[]) => T;
}

export function TaskList<T>({
  tasks,
  showChildren,
  commitTask,
  maker,
}: TaskListProps<T>) {
  return tasks.length > 0 && showChildren ? (
    <div className="container container-task">
      {tasks.map((t, i) => (
        <TaskItem
          key={i}
          task={t}
          isLast={i + 1 === tasks.length}
          commitTask={commitTask((task) =>
            maker(
              task
                ? tasks.map((t, j) => (i === j ? task : t))
                : tasks.filter((_, j) => i !== j),
            ),
          )}
        />
      ))}
    </div>
  ) : (
    <></>
  );
}
