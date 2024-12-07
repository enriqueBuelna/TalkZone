export class DataUser {
  private id: string = '';
  private username: string = '';
  private is_active: boolean = false;
  private date!: Date;
  private email: string = '';
  private follower_count:number = 0;
  constructor(
    id: string,
    username: string,
    is_active: boolean,
    date: Date,
    email: string,
    follower_count : number
  ) {
    this.id = id;
    this.username = username;
    this.is_active = is_active;
    this.date = date;
    this.email = email;
    this.follower_count = follower_count;
  }

  getFollowerCount(){
    return this.follower_count;
  }

  getId(){
    return this.id;
  }
  
  getUsername(){
    return this.username;
  }

  getDate(){
    return this.date;
  }

  getEmail(){
    return this.email;
  }

  getActive(){
    return this.is_active;
  }
}