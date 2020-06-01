export class Floor {
  private static nextId = 1;
  public id: number;

  constructor(
    public title: string,
    public campusId: number,
  ) {
    this.id = Floor.nextId++;
  }
}
