export interface individualUser {
    profile: singProfile
  }
  
  export interface singProfile {
    _id: string
    username: string
    email: string
    image: string
    questions: singlQuestion[]
    answers: singlAnswer[]
    comments: singlComment[]
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
  
  export interface singlQuestion {
    _id: string
    title: string
    titlehtml: string
    body: string
    answer: []
    user: string
    tags: string[]
    upvote: string[]
    downvote: string[]
    createdAt: string
    updatedAt: string
    __v: number
    state: string
    reportcount: number
    report?: []
  }
  
  export interface singlAnswer {
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
  
  export interface singlComment {
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
  