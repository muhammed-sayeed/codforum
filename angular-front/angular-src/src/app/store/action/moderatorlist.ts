import { createAction,props } from "@ngrx/store";
import { myState } from "src/app/types/userlist.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const moderatorListAction = createAction(
    ActionType.MODERATORLIST,
   
)

export const moderatorListSuccessAction = createAction(
    ActionType.MODERATORLIST_SUCCESS,
    props<{moderatorlist:myState[]}>()
)

export const moderatorListFailureAction = createAction (
  ActionType.MODERATORLIST_FAILURE,
  props<{error:string}>()
)