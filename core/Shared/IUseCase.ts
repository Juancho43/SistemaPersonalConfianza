export interface IUseCase<param, result> {
  execute(param: param): Promise<result>;
}