import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { State, Todo } from "../Types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  readonly state: "todos" | "doings" | "dones";
  readonly todos: Todo[];
  readonly commitTodo: (
    maker: (todo: Todo | null) => State,
  ) => (todo: Todo | null) => void;
  readonly make: (todo: Todo[]) => State;
}

export const TodoList: React.FC<TodoListProps> = ({
  state,
  todos,
  commitTodo,
  make,
}) => {
  return (
    <div
      className={`list-todo ${
        state === "todos" ? "left" : state === "doings" ? "center" : "right"
      }`}
    >
      <div className="list-todo-bar">
        <h1>{state.toUpperCase()}</h1>
        <div
          className="add-children"
          onClick={() =>
            commitTodo((todo) => make([...todos, todo!]))({
              done: false,
              msg: "",
              editing: true,
              tasks: [],
              manualShowChildren: true,
              autoShowChildren: true,
            })
          }
        >
          <FaPlusCircle />
        </div>
      </div>
      {todos.length > 0 ? (
        <div className="container container-todo">
          {todos.map((t, i) => (
            <TodoItem
              key={i}
              todo={t}
              isLast={i + 1 === todos.length}
              commitTodo={commitTodo((todo) =>
                make(
                  todo
                    ? todos.map((t, j) => (i === j ? todo : t))
                    : todos.filter((_, j) => i !== j),
                ),
              )}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
