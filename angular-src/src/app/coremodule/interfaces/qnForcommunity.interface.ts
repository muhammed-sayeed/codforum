export interface qnForcommunity {
    _id: string
    title: string
    titlehtml: string
    body: string
    answer: []
    user: string
    tags: string[]
    upvote: string[]
    downvote: []
    report: []
    createdAt: string
    updatedAt: string
    __v: number
    state: string
    matched_tags: MatchedTag[]
  }
  
  export interface MatchedTag {
    _id: string
    name: string
    image: string
    description: string
    admins: string[]
    users: string[]
    tags: string[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  