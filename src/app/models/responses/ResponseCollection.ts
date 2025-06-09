import { Response } from './Response';

export class ResponseCollection<T> extends Response {
    model!: Array<T>;
  }