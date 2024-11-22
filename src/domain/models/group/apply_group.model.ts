import { UserDemo } from "../user-demo.model";

export class ApplyGroup{
    private id:string;
    private status:string;
    private userDemo:UserDemo;
    constructor(id:string, status: string, userDemo:UserDemo){
        this.id = id;
        this.status = status;
        this.userDemo = userDemo;
    }

    getId(){
        return this.id;
    }

    getUserDemo(){
        return this.userDemo;
    }
}