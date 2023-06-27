import { authStateInterface } from "../../coremodule/interfaces/state.interface";
import { registerAction ,registerSuccessAction, registerFailureAction } from "../../featureModule/store/actions/register.action";
import { createReducer,on,Action} from '@ngrx/store'
import { loginAction, loginSuccessAction,loginFailureAction } from "../../featureModule/store/actions/login.action";
import { userListAction, userlistFailureAction, userListSuccessAction } from "../../featureModule/store/actions/userlist.action";
import { state } from "@angular/animations";
import { tagListAction, tagListFailureAction, tagListSuccessAction } from "../../featureModule/store/actions/taglist";
import { moderatorListAction, moderatorListFailureAction, moderatorListSuccessAction } from "../../featureModule/store/actions/moderatorlist";
import { communityListAction, communityListFailureAction, communityListSuccessAction } from "../../featureModule/store/actions/community";
import { badgeListAction, badgeListFailureAction, badgeListSuccessAction } from "../../featureModule/store/actions/badgelist";
import { userProfileAction, userProfileFailureAction, userProfileSuccessAction } from "../../featureModule/store/actions/userprofile";
import { usersAction, usersFailureAction, usersSuccessAction } from "../../featureModule/store/actions/useractions";


const initialState:authStateInterface= {
    isLoding : false,
    data : null,
    error : null,
    allData: [],
    tagList:[],
    communityList:[],
    badgeList:[],
    userProfile:null,
    users:[]
}

export const  Reducer = createReducer(
    initialState, on(registerAction,(state)=>({ ...state, isLoding:true,data:null, error:null})),
                  on(registerSuccessAction, (state,action) =>({  ...state, isLoding : false,allData:[], data : action.data, error : null }) ),
                  on(registerFailureAction,  (state,action)=>({ ...state, isLoding : false,allData:[], data : null, error : action.error }) ),

                  on(loginAction, (state) =>({...state,isLoding :true,data : null,error: null }) ),
                  on(loginSuccessAction,(state,action) =>({ ...state, isLoding :false,allData:[],data: action.data,error: null}) ),
                  on(loginFailureAction,(state,action) =>({...state,isLoding :false,allData:[],data : null,error: action.error })),

                 on(userListAction,(state)=>({...state, isLoding:true, data:null,allData:[],error:null})),
                 on(userListSuccessAction,(state,action)=>({...state,isLoding:false,data:null,allData:action.userlist,error:null})),
                 on(userlistFailureAction,(state,action)=>({...state,isLoding:false,data:null,allData:[],error:action.error})),

                 on(tagListAction,(state)=>({...state, isLoding:true,tagList:[],error:null})),
                 on(tagListSuccessAction,(state,action)=>({...state,isLoding:false,tagList:action.taglist,error:null})),
                 on(tagListFailureAction,(state,action)=>({...state,isLoding:false,tagList:[],error:action.error})),

                 on(moderatorListAction,(state)=>({...state,isLoding:true,data:null,allData:[],error:null})),
                 on(moderatorListSuccessAction,(state,action)=>({...state,isLoding:false,data:null,allData:action.moderatorlist,error:null})),
                 on(moderatorListFailureAction,(state,action)=>({...state,isLoding:false,data:null,allData:[],error:null})),

                 on(communityListAction,(state)=>({...state,isLoding:true,communityList:[],error:null})),
                 on(communityListSuccessAction,(state,action)=>({...state,isLoding:false,communityList:action.communityList,error:null})),
                 on(communityListFailureAction,(state,action)=>({...state,isLoding:false,communityList:[],error:null})),

                 on(badgeListAction,(state)=>({...state,isLoding:true,badgeList:[],error:null})),
                 on(badgeListSuccessAction,(state,action)=>({...state,isLoding:false,badgeList:action.badges,error:null})),
                 on(badgeListFailureAction,(state,action)=>({...state,isLoding:false,badgeList:[],error:action.error})),

                 on(userProfileAction,(state)=>({...state,isLoding:true,userProfile:null,error:null})),
                 on(userProfileSuccessAction,(state,action)=>({...state,isLoding:false,userProfile:action.profile,error:null})),
                 on(userProfileFailureAction,(state,action)=>({...state,isLoding:false,userProfile:null,error:action.error})),

                 on(usersAction,(state)=>({...state,isLoding:true,users:[],error:null})),
                 on(usersSuccessAction ,(state,action)=>({...state,isLoding:false,users:action.users,error:null})),
                 on(usersFailureAction,(state,action)=>({...state,isLoding:false,users:[],error:action.error}))


)




