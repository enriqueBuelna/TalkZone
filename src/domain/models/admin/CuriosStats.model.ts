export class CuriosStats {
  private sevenPost: number;
  private monthPost: number;
  private sixMonthPost: number;
  private sevenUser: number;
  private monthUser: number;
  private sixMonthUser: number;
  private sevenRoom: number;
  private monthRoom: number;
  private sixMonthRoom: number;
  private allUser: number;
  private allPost: number;
  private allRoom: number;
  constructor(
    sevenPost: number,
    monthPost: number,
    sixMonthPost: number,
    sevenUser: number,
    monthUser: number,
    sixMonthUser: number,
    sevenRoom: number,
    monthRoom: number,
    sixMonthRoom: number,
    allUser: number,
    allPost: number,
    allRoom: number
  ) {
    this.sevenPost = sevenPost;
    this.monthPost = monthPost;
    this.sixMonthPost = sixMonthPost;
    this.sevenRoom = sevenRoom;
    this.monthRoom = monthRoom;
    this.sixMonthRoom = sixMonthRoom;
    this.sevenUser = sevenUser;
    this.monthUser = monthUser;
    this.sixMonthUser = sixMonthUser;
    this.allPost = allPost;
    this.allRoom = allRoom;
    this.allUser = allUser;
  }

  getAllUsers() {
    return this.allUser;
  }

  getAllRoom() {
    return this.allRoom;
  }

  getAllPost() {
    return this.allPost;
  }

  // Getters
  public getSevenPost(): number {
    return this.sevenPost;
  }

  public getMonthPost(): number {
    return this.monthPost;
  }

  public getSixMonthPost(): number {
    return this.sixMonthPost;
  }

  public getSevenUser(): number {
    return this.sevenUser;
  }

  public getMonthUser(): number {
    return this.monthUser;
  }

  public getSixMonthUser(): number {
    return this.sixMonthUser;
  }

  public getSevenRoom(): number {
    return this.sevenRoom;
  }

  public getMonthRoom(): number {
    return this.monthRoom;
  }

  public getSixMonthRoom(): number {
    return this.sixMonthRoom;
  }
}
