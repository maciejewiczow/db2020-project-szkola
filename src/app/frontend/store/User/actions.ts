import { CurrentUserState } from './store'

export enum UserActionType {
    updateUserData = 'currentUser/UPDATE',
}

export type UserAction =
{
    type: UserActionType.updateUserData
    user: Partial<CurrentUserState>
}

export const updateCurrentUser = (user: Partial<CurrentUserState>) => ({
    type: UserActionType.updateUserData,
    user
})
