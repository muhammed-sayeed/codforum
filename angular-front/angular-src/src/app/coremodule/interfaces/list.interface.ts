export interface listInterface {
    admins:Admin[]
    createdAt:string
    description:string
    image:string
    name:string
    tags:[]
    updatedAt:string
    users:[]
    _id:string
}

interface Admin{
    access:string
    answers:[]
    badges:[]
    bio:string
    category:string
    comments:[]
    createdAt:string
    education:string
    email:string
    image:string
    password:string
    phone:number
    place:string
    qncount:number
    questions:[]
    reputation:number
    updatedAt:string
    username:string
    work:string
    _id:string
}