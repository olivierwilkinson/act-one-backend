export default class ApplicationError extends Error {
  public message: string;

  public status: number;

  public code: string;

  public details: object;

  constructor(
    message: string = 'An unknown application error occured',
    status: number = 500,
    code: string = 'APPLICATION_ERROR',
    details: object = {}
  ) {
    super();
    this.message = message;
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
