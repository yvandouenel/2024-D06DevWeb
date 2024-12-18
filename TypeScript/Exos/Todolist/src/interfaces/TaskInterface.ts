export default interface TaskInterface {
  id: string;
  title: string;
  description?: string;
  done: boolean;
}
export interface PartialTaskWithId {
  id: string;
  title?: string;
  description?: string;
  done?: boolean;
}
