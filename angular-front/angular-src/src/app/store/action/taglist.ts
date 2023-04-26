import { createAction,props } from "@ngrx/store";
import { taglist } from "src/app/types/taglist.interface";
import { ActionType } from "../actiontypes/actiontypes";

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