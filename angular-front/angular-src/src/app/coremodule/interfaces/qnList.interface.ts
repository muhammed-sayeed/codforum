export interface qnList {
    reportcount: number
    _id: string
    title: string
    titlehtml: string
    body: string
    answer: []
    user: User
    tags: string[]
    upvote: string[]
    downvote: []
    report: []
    createdAt: string
    updatedAt: string
    __v: number
    state: string
  }
  
  export interface User {
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
  