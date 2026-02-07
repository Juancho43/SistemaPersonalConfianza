import { Progress } from '../../Domain/Progress';

export class ProgressResponse {
  static generate(progress: Progress) {
    return {
      id: progress.id ?? '',
      progress: progress.progress,
      date: progress.date,
      description: progress.description,
    };
  }
}
