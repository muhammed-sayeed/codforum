export interface articleType{
    _id:string
    title:string
    titlehtml:string
    body:string
    tags:string[]
    user:user
    state:string
    community:string
    createdAt:Date
    updatedAt:Date
}

interface user{
    username:string
    image:string
}