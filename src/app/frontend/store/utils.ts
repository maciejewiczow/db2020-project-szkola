import { Action } from "redux"

export type PickAction<A extends Action<string>, T extends A['type']> = Extract<A, { type: T }>

