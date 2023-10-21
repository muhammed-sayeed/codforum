export interface profileInterface {
    _id: string
    username: string
    email: string
    image: string
    questions: Question[]
    answers: Answer[]
    badges: []
    createdAt: string
    bio: string
    education: string
    place: string
    work: string
    comments: Comment[]
  }
  
  export interface Question {
    _id: string
    title: string
    titlehtml: string
    body: string
    answer: []
    user: string
    tags: Tag[]
    upvote: string[]
    downvote: string[]
    createdAt: string
    updatedAt: string
    __v: number
    state: string
    reportcount: number
    report?: []
  }
  
  export interface Tag {
    _id: string
    name: string
    description: string
    image: string
    point: number
    __v: number
  }
  
  export interface Answer {
    _id: string
    body: string
    question: string
    user: string
    upvote: string[]
    downvote: string[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Comment {
    _id: string
    title: string
    titlehtml: string
    body: string
    tags: string[]
    user: string
    state: string
    community: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  