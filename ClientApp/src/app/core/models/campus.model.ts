export class Campus {
  private static nextId = 1;
  public id: number;

  constructor(
    public title: string,
  ) {
    this.id = Campus.nextId++;
  }
}
