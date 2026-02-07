export class FilteredGoalsQuery {
  constructor(
    public profileId: string,
    public state: string,
    public order: string,
  ) {}
}
