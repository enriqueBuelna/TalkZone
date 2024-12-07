export class PrincipalStats{
    private cant_users:number = 0;
    private cant_post:number = 0;
    private cant_vr:number = 0;
    private cant_groups:number = 0;
    
    constructor(cant_users:number, cant_post:number, cant_vr:number, cant_groups:number){
        this.cant_users = cant_users;
        this.cant_post = cant_post;
        this.cant_vr = cant_vr;
        this.cant_groups = cant_groups;
    }

    getUsers(){
        return this.cant_users;
    }

    getPost(){
        return this.cant_post;
    }
    
    getVr(){
        return this.cant_vr;
    }

    getGroups(){
        return this.cant_groups;
    }
}