export interface IReseponseData<T> {
  success: boolean;
  message?: string;
  data?: T;
  code: number;
}
