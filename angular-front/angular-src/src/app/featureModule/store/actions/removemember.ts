import { createAction, props } from "@ngrx/store";
import { ActionType } from "../actiontype";

export const removeMemberAction = createAction(
    ActionType.REMOVEFROMCOMMUNITY,
    props<{Id:string,ID:string | null}>()
)

export const removeMemberSuccessAction = createAction(
    ActionType.REMOVEFROMCOMMUNITY_SUCCESS,
    props<{success:true}>()
)

export const removeMemberFailureAction = createAction(
    ActionType.REMOVEFROMCOMMUNITY_FAILURE,
    props<{error:string}>()
)