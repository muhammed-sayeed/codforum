export interface tagBasedQn {
    tagDetails: TagDetails
    tagQn: TagQn[]
  }
  
  export interface TagDetails {
    _id: string
    name: string
    description: string
    image: string
    point: number
    __v: number
  }
  
  export interface TagQn {
    reportcount: number
    _id: string
    title: string
    titlehtml: string
    body: string
    answer: []
    user: TagUser
    tags: string[]
    upvote: string[]
    downvote: []
    report?: []
    createdAt: string
    updatedAt: string
    __v: number
    state: string
  }
  
  export interface TagUser {
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
    bio?: string
    education?: string
    place?: string
    work?: string
    qncount: number
  }
  