import { Message } from "./message.model";
import { UserDemo } from "./user-demo.model";

export class Conversation{
    private last_message: Message;
    private userInfo : UserDemo;
    
    constructor(last_message: Message, userInfo: UserDemo){
        this.last_message = last_message;
        this.userInfo = userInfo;
    }

    getLastMessage(){
        return this.last_message;
    }

    getUserInfo(){
        return this.userInfo;
    }
}