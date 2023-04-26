import { createAction,props } from "@ngrx/store";
import { successState } from "src/app/types/success.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const addTagAction = createAction(
    ActionType.ADDTAG,
    props<{value:any}>()
)

export const addTagSuccessAction = createAction(
    ActionType.ADDTAG_SUCCESS,
    props<{success:true}>()
)

export const addTagFailureAction = createAction(
    ActionType.ADDTAG_FAILURE,
    props<{error:string}>()
)