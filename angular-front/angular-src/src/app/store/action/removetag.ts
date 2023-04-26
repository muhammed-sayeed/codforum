import { createAction,props } from "@ngrx/store";
import { successState } from "src/app/types/success.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const removeTagAction =createAction(
    ActionType.REMOVETAG,
    props<{Id:string}>()
)

export const removeTagSuccessAction = createAction(
    ActionType.REMOVETAG_SUCCESS,
    props<{responce:successState}>()
)

export const removeTagFailureAction = createAction (
    ActionType.REMOVETAG_FAILURE,
    props<{error:string}>()
)