import { createAction,props } from "@ngrx/store";
import { badgeList } from "src/app/coremodule/interfaces/badge.interface";
import { ActionType } from "../actiontype"; 

export const badgeDetailsAction = createAction(
    ActionType.BADGELIST,
    props<{Id:string}>()
)

export const badgeDetailSuccessAction = createAction(
    ActionType.BADGELIST_SUCCESS,
    props<{badge:badgeList[]}>()
)

export const badgeDetailFailureAction = createAction(
    ActionType.BADGELIST_FAILURE,
    props<{error:string}>()
)