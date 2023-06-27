import { state } from '@angular/animations'
import { createFeatureSelector,createSelector, State} from '@ngrx/store'
import { AppStateInterface } from '../../coremodule/interfaces/appstate.interface'
import { authStateInterface } from '../../coremodule/interfaces/state.interface'



export const authFeatureSelector = (state: AppStateInterface)=> state.auth



export const isLodingSelector = createSelector(
    authFeatureSelector,
    (State)=>State.isLoding
)
export const isDataSelector = createSelector(
    authFeatureSelector,
    (state)=>state.data
)
export const isErrorSelector = createSelector(
    authFeatureSelector,
    (state)=>state.error
)
export const isAllDataSelector = createSelector(
    authFeatureSelector,
    (state)=>state.allData
)

export const isTagSelector = createSelector(
    authFeatureSelector,
    (state)=>state.tagList
)

export const communitySelector = createSelector(
    authFeatureSelector,
    (state)=>state.communityList
)

export const badgeSelector = createSelector(
    authFeatureSelector,
    (state)=>state.badgeList
)

export const profileSelector = createSelector(
    authFeatureSelector,
    (state)=>state.userProfile
)

export const usersSelector = createSelector(
    authFeatureSelector,
    (state)=>state.users
)


