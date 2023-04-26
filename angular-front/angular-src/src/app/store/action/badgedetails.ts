import { createAction,props } from "@ngrx/store";
import { badgeList } from "src/app/types/badge.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const badgeDetailsAction = createAction(
    ActionType.BADGEDETAILS,
    props<{Id:string}>()
)

export const badgeDetailSuccessAction = createAction(
    ActionType.BADGEDETAILS_SUCCESS,
    props<{badge:badgeList[]}>()
)

export const badgeDetailFailureAction = createAction(
    ActionType.BADGEDETAILS_FAILURE,
    props<{error:string}>()
)