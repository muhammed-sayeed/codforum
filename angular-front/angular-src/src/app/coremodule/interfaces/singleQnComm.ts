export interface commentsForsing {
    comments: Comment[]
  }
  
  export interface Comment {
    _id: string
    body: string
    question: string
    user: User
    createdAt: string
    updatedAt: string
    __v: number
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
  