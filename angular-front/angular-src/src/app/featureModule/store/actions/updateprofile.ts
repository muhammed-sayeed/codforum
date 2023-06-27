import { createAction,props } from "@ngrx/store";
import { ActionType } from "../actiontype";

export const updateProfileAction = createAction(
    ActionType.UPDATEPROFILE,
    props<{Id: string | null ,username:string | null, job: string|null,education:string|null,bio:string|null,place:string|null}>()
)

export const updateProfileSuccessAction = createAction(
    ActionType.UPDATEPROFILE_SUCCESS,
    props<{success:true}>()
)

export const updateProfileFailureAction = createAction(
    ActionType.UPDATEPROFILE_FAILURE,
    props<{error:string}>()
)