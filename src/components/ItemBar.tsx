import React, { useState } from "react";
import {
  FaCheck,
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaPen,
  FaPlusCircle,
  FaRegCheckCircle,
  FaRegCircle,
  FaTrashAlt,
} from "react-icons/fa";

interface ItemBarProps {
  readonly done: boolean;
  readonly showChildren: boolean;
  readonly childrenLength: number;
  readonly msg: string;
  readonly toogle: () => void;
  readonly toogleShowChildren: () => void;
  readonly changeEditing: (v: boolean) => void;
  readonly commitMsg: (v: string) => void;
  readonly commitChildren: () => void;
  readonly editing: boolean;
  readonly place: "todo" | "task";
  readonly deleteSelf: () => void;
}

export const ItemBar: React.FC<ItemBarProps> = ({
  done,
  childrenLength,
  showChildren,
  msg,
  toogle,
  toogleShowChildren,
  place,
  changeEditing,
  editing,
  commitMsg: commitMessage,
  commitChildren,
  deleteSelf,
}) => {
  const [hovered, setHovered] = useState(false);

  const [newMsg, setNewMsg] = useState(msg);

  const commitMsg = (msg: string) =>
    msg === "" ? deleteSelf() : commitMessage(msg);

  const reset = () => {
    changeEditing(false);
    msg === "" ? deleteSelf() : setNewMsg(msg);
  };

  return (
    <div
      className={`msg msg-${place}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {done ? (
        <FaRegCheckCircle className="checkBox" onClick={() => toogle()} />
      ) : (
        <FaRegCircle className="checkBox" onClick={() => toogle()} />
      )}

      {!editing ? (
        place === "todo" ? (
          <h3>{msg}</h3>
        ) : (
          <h6>{msg}</h6>
        )
      ) : (
        <input
          type="text"
          className="editing"
          value={newMsg}
          onChange={(ev) => setNewMsg(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") commitMsg(newMsg);
            if (ev.key === "Escape") reset();
          }}
          autoFocus={editing}
          onBlur={() => reset()}
        />
      )}
      <div className="item-bar">
        {hovered ? (
          <>
            <div
              className="add-children icon-container"
              onClick={() => commitChildren()}
            >
              <FaPlusCircle className="add-children-icon icon" />
            </div>
            <div
              className="edit-element icon-container"
              onClick={() => changeEditing(!editing)}
            >
              {!editing ? (
                <FaPen className="edit-element-icon icon" />
              ) : (
                <FaCheck className="edit-element-icon icon" />
              )}
            </div>
            <div
              className="remove-element icon-container danger"
              onClick={() => deleteSelf()}
            >
              <FaTrashAlt className="remove-element-icon icon" />
            </div>
          </>
        ) : (
          <></>
        )}
        {childrenLength > 0 ? (
          <div
            className="show-children icon-container"
            onClick={() => toogleShowChildren()}
          >
            {showChildren ? (
              <FaChevronCircleUp className="show-children-icon icon" />
            ) : (
              <FaChevronCircleDown className="show-children-icon icon" />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
