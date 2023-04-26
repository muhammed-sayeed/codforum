import { badgeList } from "./badge.interface";
import { communityList } from "./community.interface";
import { profile } from "./profile.interface";
import { taglist } from "./taglist.interface";
import { myState } from "./userlist.interface";
import { users } from "./users.interface";

export interface authStateInterface{
    isLoding : boolean,
    data : {username:string,email:string,password:string,phone:number,token:string,refreshtoken:string} | null,
    error : string | null,
    allData:myState[]
    tagList:taglist[]
    communityList:communityList[]
    badgeList:badgeList[]
    userProfile?:profile | null
    users:users[]
}

export interface logState {
    
}

