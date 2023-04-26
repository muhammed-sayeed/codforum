import { createAction,props } from "@ngrx/store";
import { successState } from "src/app/types/success.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const editUserAction = createAction(
    ActionType.EDITUSER,
    props<{Id:string | null,username:string | null,email:string | null,phone:number| null | string}>()
)

export const editUserSuccessAction = createAction(
    ActionType.EDITUSER_SUCCESS,
    props<{responce:successState}>()
)

export const editUserFailureAction = createAction(
    ActionType.EDITUSER_FAILURE,
    props<{error:string}>()
)