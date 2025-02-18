export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'QA' | 'COMPLETED';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
  priority:string
};

export type Column = {
  id: TaskStatus;
  title: string;
};