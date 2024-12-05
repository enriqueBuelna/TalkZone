export interface IPost{
    user_id:string,
    content:string,
    visibility:string,
    user_preference_id?:number,
    media_url?:string,
    type_community?:string,
    community_id?:string
    tags: string[]
}