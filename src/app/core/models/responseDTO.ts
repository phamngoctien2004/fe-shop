export interface ResponseDTO<T>{
  code?: string
  data?: T;
  error?: T;
  success: boolean;
  message: string;
}
