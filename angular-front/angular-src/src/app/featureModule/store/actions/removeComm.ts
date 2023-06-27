import { createAction,props } from "@ngrx/store";
import { ActionType } from "../actiontype";

export const removeCommunityAction = createAction(
    ActionType.REMOVECOMMUNITY,
    props<{Id:string}>()
)

export const removeCommunitySuccessAction = createAction(
    ActionType.REMOVECOMMUNITY_SUCCESS,
    props<{success:true}>()
    
)

export const removeCommunityFailurAction = createAction(
   ActionType.REMOVECOMMUNITY_FAILURE,
   props<{error:string}>()
)