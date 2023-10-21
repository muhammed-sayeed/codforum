export interface singleArticle {
    Art: Art
    artComments: ArtComment[]
  }
  
  export interface Art {
    _id: string
    title: string
    titlehtml: string
    body: string
    tags: []
    user: User
    state: string
    community: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface User {
    bio: string
    education: string
    work: string
    place: string
    qncount: number
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
  }
  
  export interface ArtComment {
    _id: string
    body: string
    question: string
    user: User2
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface User2 {
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
  