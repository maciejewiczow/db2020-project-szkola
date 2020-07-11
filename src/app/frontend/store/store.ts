import { createStore } from "redux";
import isDev from 'electron-is-dev'

import rootReducer from "./reducers";
import { CurrentUserState } from "./User/store";

export interface AppState {
    currentUser: CurrentUserState
}

export const store = createStore(rootReducer)
