import { UserDemo } from '../user-demo.model';

export class TopHosts {
  private userDemo: UserDemo;
  private average_rating: number;
  private count_rate: number;

  constructor(userDemo: UserDemo, average_rating: number, count_rate: number) {
    this.userDemo = userDemo;
    this.average_rating = average_rating;
    this.count_rate = count_rate;
  }

  getUserDemo(){
    return this.userDemo;
  }

  getAverageRating(){
    return this.average_rating;
  }

  getCountRate(){
    return this.count_rate;
  }
}