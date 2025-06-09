import { Response } from './Response';

export class ResponseModel<T> extends Response {
    model!: T;
  }