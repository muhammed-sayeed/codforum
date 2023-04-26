import { createAction,props } from "@ngrx/store";
import { ActionType } from "../actiontypes/actiontypes";

export const editBadgeAction = createAction(
    ActionType.EDITBADEG,
    props<{id:string | null ,name:string | null,criteria:string | null}>()
)

export const editBadgeSuccessAction = createAction(
    ActionType.EDITBADGE_SUCCESS,
    props<{success:true}>()
)

export const editBadgeFailureAction = createAction(
    ActionType.EDITBADGE_FAILURE,
    props<{error:string}>()
)