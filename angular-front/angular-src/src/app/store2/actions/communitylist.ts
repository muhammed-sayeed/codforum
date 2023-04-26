import { createAction,props } from "@ngrx/store";
import { actionType } from "../actiontypes/actiontypes";
import { communityList } from "src/app/types/community.interface";

export const communityDetailAction = createAction(
    actionType.COMMUNITYDETAIL,
    props<{Id:string }>()
)
export const communityDetailSuccessAction = createAction(
    actionType.COMMUNITYDETAIL_SUCCESS,
    props<{community:communityList}>()
)
export const communityDetailFailureAction = createAction(
    actionType.COMMUNITYDETAIL_FAILURE,
    props<{erroe:string}>()
)