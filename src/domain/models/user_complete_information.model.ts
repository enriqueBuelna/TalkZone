import { UserDemo } from "./user-demo.model";
import { UserPreference } from "./user_preference.model";

// src/app/core/domain/user.ts
export class UserComplete {
    private userDemo: UserDemo;
    private userPreferences: UserPreference[];
    private about_me:string;
    private cover_picture:string;
    constructor(userDemo:UserDemo, userPreferences:UserPreference[], about_me:string, cover_picture: string){
        this.userDemo = userDemo;
        this.userPreferences = userPreferences;
        this.about_me = about_me;
        this.cover_picture = cover_picture;
    }

    getUserDemo(){
        return this.userDemo;
    }

    getUserPreferences(){
        return this.userPreferences;
    }

    getAboutMe(){
        return this.about_me;
    }

    getCoverPicture(){
        return this.cover_picture;
    }

    setCoverPicture(cover_picture: string){
        this.cover_picture = cover_picture;
    }

    setAboutMe(about_me:string){
        this.about_me = about_me;
    }
  }