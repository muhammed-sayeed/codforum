export interface ansForSing {
    _id: string
    body: string
    upvote: []
    downvote: []
    createdAt: string
    liked: boolean
    user: User
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
  