import { createAction,props } from "@ngrx/store";
import { badgeList } from "src/app/coremodule/interfaces/badge.interface";
import { ActionType } from "../actiontype";

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