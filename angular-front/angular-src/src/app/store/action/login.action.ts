import { createAction,props } from "@ngrx/store";
import { Login } from "src/app/types/login.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const loginAction = createAction(
    ActionType.LOGIN,
    props<{email:string; password:string}>()
)

export const loginSuccessAction = createAction(
    ActionType.LOGIN_SUCCESS,
    props<{data:Login}>()
)

export const loginFailureAction = createAction(
    ActionType.LOGIN_FAILURE,
    props<{error:any}>()
)