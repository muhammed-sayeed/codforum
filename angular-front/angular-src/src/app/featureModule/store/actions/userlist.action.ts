import { createAction,props } from "@ngrx/store";
import { myState } from "src/app/coremodule/interfaces/userlist.interface";
import { ActionType } from "../actiontype";

export const userListAction = createAction(
    ActionType.USERLIST,
)

export const userListSuccessAction = createAction(
    ActionType.USERLIST_SUCCESS,
    props<{userlist:myState[]}>()
)

export const userlistFailureAction = createAction(
    ActionType.USERLIST_FAILURE,
    props<{error:string}>()
)