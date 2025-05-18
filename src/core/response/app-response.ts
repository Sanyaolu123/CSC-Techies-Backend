export class AppResponse<T> {
  status: string;
  message: string;
  data: T;

  constructor(status: string, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string, data: T): AppResponse<T> {
    return new AppResponse<T>('success', message, data);
  }

  static error<T>(
    message: string,
    data: T | null = null,
  ): AppResponse<T | null> {
    return new AppResponse<T | null>('error', message, data);
  }
}
