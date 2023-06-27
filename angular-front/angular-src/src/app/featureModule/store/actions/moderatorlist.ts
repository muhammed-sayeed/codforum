import { createAction,props } from "@ngrx/store";
import { myState } from "src/app/coremodule/interfaces/userlist.interface";
import { ActionType } from "../actiontype";

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