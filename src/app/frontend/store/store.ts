import { createStore } from "redux";

import reducer from "./reducers";
import { CurrentUserState } from "./User/store";

export interface AppState {
    currentUser?: CurrentUserState
}

export const store = createStore(reducer)
