import { createAction,props } from "@ngrx/store";
import { myState } from "src/app/types/userlist.interface";
import { ActionType } from "../actiontypes/actiontypes";

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