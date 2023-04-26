import { createAction,props } from "@ngrx/store";
import { badgeList } from "src/app/types/badge.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const badgeListAction = createAction(
    ActionType.BADGELIST
)

export const badgeListSuccessAction = createAction(
    ActionType.BADGELIST_SUCCESS,
    props<{badges:badgeList[]}>()
)

export const badgeListFailureAction = createAction(
    ActionType.BADGELIST_FAILURE,
    props<{error:string}>()
)