export interface singleQuestion {
    qn: singQn
    activity: string
  }
  
  export interface singQn {
    _id: string
    title: string
    titlehtml: string
    body: string
    answer: []
    user: singUser
    tags: Tag[]
    upvote: []
    downvote: []
    reportcount: number
    state: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface singUser {
    _id: string
    username: string
    phone: number
    email: string
    password: string
    image: string
    questions: []
    answers: []
    comments: []
    reputation: number
    category: string
    access: boolean
    badges: []
    createdAt: string
    updatedAt: string
    __v: number
    bio: string
    education: string
    place: string
    work: string
    qncount: number
  }
  
  export interface Tag {
    _id: string
    name: string
    description: string
    image: string
    point: number
    __v: number
  }
  