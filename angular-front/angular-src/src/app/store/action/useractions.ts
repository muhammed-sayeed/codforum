import { createAction,props } from "@ngrx/store";
import { getQn } from "src/app/types/questionss.interface";
import { singleUser } from "src/app/types/singleuser.interface";
import { users } from "src/app/types/users.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const usersAction = createAction(
    ActionType.USERS,
)

export const usersSuccessAction = createAction(
    ActionType.USERS,
    props<{users:users[]}>()
)


export const usersFailureAction = createAction(
    ActionType.USERS,
    props<{error:null}>()
)

//----------------SINGLE USER----------------------------
export const singleUserAction = createAction(
    ActionType.SINGLEUSER,
    props<{Id:string}>()
)

export const singleUserSuccessAction = createAction(
    ActionType.SINGLEUSER,
    props<{single:singleUser}>()
)

export const singleUserFailureAction = createAction(
    ActionType.SINGLEUSER,
    props<{error:string}>()
)

//-----------------GET QN---------------------------
export const getQuestionsAction = createAction(
    ActionType.GETQUESTIONS,
)

export const getQuestionsSuccessAction = createAction(
    ActionType.GETQUESTIONS_SUCCESS,
    props<{questions:getQn[]}>()
)

export const getQuestionsFailureAction = createAction(
    ActionType.GETQUESTIONS_FAILURE,
    props<{error:string}>()
)


