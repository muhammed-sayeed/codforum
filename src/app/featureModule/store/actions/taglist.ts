import { createAction,props } from "@ngrx/store";
import { taglist } from "src/app/coremodule/interfaces/taglist.interface";
import { ActionType } from "../actiontype";

export const tagListAction = createAction(
    ActionType.TAGLIST
)

export const tagListSuccessAction = createAction(
    ActionType.TAGLIST_SUCCESS,
    props<{taglist:taglist[]}>()
)

export const tagListFailureAction = createAction(
    ActionType.TAGLIST_FAILURE,
    props<{error:string}>()
)