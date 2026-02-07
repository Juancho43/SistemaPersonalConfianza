import { CreateProgressRequest } from './CreateProgressRequest';

export class UpdateProgressRequest {
  constructor(
    public id: string,
    public progress: CreateProgressRequest,
    ){}
}