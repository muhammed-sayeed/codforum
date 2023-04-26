import { createAction,props } from "@ngrx/store";
import { actionType } from "../actiontypes/actiontypes";
import { taqQn } from "src/app/types/tagqn.interface";

export const tagQnAction = createAction(
    actionType.TAGQN,
    props<{Id:string}>()
)
export const tagQnSuccessAction = createAction(
    actionType.TAGQN,
    props<{questions:taqQn[]}>()
)
export const tagQnFailureAction = createAction(
    actionType.TAGQN,
    props<{error:string}>()
)