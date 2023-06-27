import { createAction,props } from "@ngrx/store";
import { communityList } from "src/app/coremodule/interfaces/community.interface";
import { ActionType } from "../actiontype";

export const communityListAction = createAction (
    ActionType.COMMUNITYLIST,
)

export const communityListSuccessAction = createAction (
    ActionType.COMMUNITYLIST_SUCCESS,
    props<{communityList:communityList[]}>()
)

export const communityListFailureAction = createAction (
    ActionType.COMMUNITYLIST_FAILURE,
    props<{error:string}>
)