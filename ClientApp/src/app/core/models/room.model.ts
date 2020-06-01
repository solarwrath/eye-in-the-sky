export class Room {
  private static nextId = 1;
  public id: number;

  constructor(
    public title: string,
    public floorId: number,
  ) {
    this.id = Room.nextId++;
  }
}
