import { createAction,props } from "@ngrx/store";
import { ActionType } from "../actiontypes/actiontypes";

export const addCommunityAction = createAction(
    ActionType.ADDCOMMUNITY,
    props<{value:any}>()
)

export const addCommunitySuccessAction = createAction(
    ActionType.ADDCOMMUNITY_SUCCESS,
    props<{success:true}>()
)

export const addCommunityFailureAction = createAction(
    ActionType.ADDCOMMUNITY_FAILURE,
    props<{error:string}>()
)