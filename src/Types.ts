export interface Task {
  readonly editing: boolean;
  readonly done: boolean;
  readonly msg: string;
  readonly childrenTasks: Task[];
  readonly autoShowChildren: boolean;
  readonly manualShowChildren: boolean;
}

export interface Todo {
  readonly editing: boolean;
  readonly done: boolean;
  readonly msg: string;
  readonly tasks: Task[];
  readonly autoShowChildren: boolean;
  readonly manualShowChildren: boolean;
}

export interface State {
  Todos: Todo[];
  Doings: Todo[];
  Dones: Todo[];
}
