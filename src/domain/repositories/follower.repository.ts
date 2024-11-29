import { Observable } from "rxjs";

export abstract class FollowerRepository{
    abstract followUser(follower_id:string, followed_id:string):Observable<boolean>;
    abstract unfollowUser(follower_id:string, followed_id:string):Observable<boolean>;
    abstract deleteFollower(user_id:string, user_follower:string):Observable<boolean>;
}