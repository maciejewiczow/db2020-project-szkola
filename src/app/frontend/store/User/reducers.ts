import { Reducer } from "redux"
import { UserActionType, UserAction } from './actions'
import { CurrentUserState, initialCurrentUserState } from './store'

export const userReducer: Reducer<CurrentUserState, UserAction> = (
    state = initialCurrentUserState,
    action
) => {
    switch (action.type) {
        case UserActionType.updateUserData:
            return {
                ...state,
                ...action.user
            }
        default:
            return state;
    }
}
