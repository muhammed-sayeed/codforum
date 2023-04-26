import { createAction,props } from "@ngrx/store";
import { successState } from "src/app/types/success.interface";
import { ActionType } from "../actiontypes/actiontypes";

export const editTagAction = createAction(
    ActionType.EDITTAG,
    props<{Id:string | null,name:string | null,description:string | null}>()
)

export const editTagSuccessAction = createAction(
    ActionType.EDITTAG_SUCCESS,
    props<{responce:successState}>()
)

export const editTagFailureAction = createAction(
    ActionType.EDITTAG_FAILURE,
    props<{error:string}>()
)