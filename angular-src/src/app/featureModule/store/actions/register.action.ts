import { createAction,props } from "@ngrx/store";
import { ActionType } from "../actiontype";

export const registerAction = createAction(
    ActionType.REGISTER,
    props<{username:string; email:string; phone:number; password:string}>()
)  

export const registerSuccessAction = createAction(
    ActionType.REGISTER_SUCCESS,
    props<{data:{Id:string;username:string; email:string; phone:number; password:string,token:string,refreshtoken:string}}>()
)

export const registerFailureAction = createAction(ActionType.REGISTER_FAILURE,
    props<{ error:string}>()
    )

    