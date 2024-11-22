import { UserDemo } from './user-demo.model';

export class CommunityMember {
  private userDemo: UserDemo;
  private type: string;
  private role: string;

  constructor(userDemo: UserDemo, type: string, role: string) {
    this.userDemo = userDemo;
    this.type = type;
    this.role = role;
  }

  getUserDemo(){
    return this.userDemo;
  }

  getType(){
    return this.type;
  }

  getRole(){
    return this.role;
  }
}   