export class ModerationReport {
  private id = 0;
  private reporter_username = '';
  private reported_username = '';
  private status = '';
  private reason = '';
  private type: string;
  private date!: Date;
  constructor(
    id: number,
    reporter_username: string,
    reported_username: string,
    status: string,
    reason: string,
    date: Date,
    type: string
  ) {
    this.id = id;
    this.reported_username = reported_username;
    this.reporter_username = reporter_username;
    this.status = status;
    this.reason = reason;
    this.date = date;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getId() {
    return this.id;
  }

  getReported() {
    return this.reported_username;
  }

  getReporter() {
    return this.reporter_username;
  }

  getStatus() {
    return this.status;
  }

  getReason() {
    return this.reason;
  }

  getDate() {
    return this.date;
  }

  setStatus(){
    this.status = 'resolved';
  }
}
