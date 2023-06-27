import { createAction,props } from "@ngrx/store";
import { ActionType } from "../actiontype";

export const addBadgeAction = createAction(
  ActionType.ADDBADGE,
  props<{name:string,criteria:string}>()
)

export const addBadgeSuccessAction = createAction(
    ActionType.ADDBADGE_SUCCESS,
    props<{success:true}>()
)

export const addBadgeFailureAction = createAction(
    ActionType.ADDBADGE_FAILURE,
    props<{error:string}>()
)