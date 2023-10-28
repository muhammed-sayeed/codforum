import { createAction,props } from "@ngrx/store";
import { profile } from "src/app/coremodule/interfaces/profile.interface";
import { ActionType } from "../actiontype";

export const userProfileAction = createAction(
    ActionType.USERPROFILE
)

export const userProfileSuccessAction = createAction(
    ActionType.USERPROFILE_SUCCESS,
    props<{profile:profile}>()
)

export const userProfileFailureAction = createAction(
    ActionType.USERPROFILE_FAILURE,
    props<{error:string}>()
)