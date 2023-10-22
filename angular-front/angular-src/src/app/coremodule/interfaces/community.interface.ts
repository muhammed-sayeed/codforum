export interface communityList {
    _id:string
    name:string
    description:string
    admins:admins[]
    users:[]
    tags:[]
    image:string
    members:string[]
}

interface admins{
    username:string
    email:string
    _id:string
    phone:number
}