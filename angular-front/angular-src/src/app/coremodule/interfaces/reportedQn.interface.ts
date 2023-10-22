export interface reportedQn{
    answer:[]
    body:string
    createdAt:string
    downvote:[]
    reportcount:number
    state:string
    tags:[]
    title:string
    titlehtml:string
    updatedAt:string
    upvote:[]
    user:user
    _id:string
}

interface user{
    image:string
    username:string
}