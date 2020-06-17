export interface CurrentUserState {
    UserID: number;
    Email: string;
    Name: string;
    Surname: string;
    UserRoleID: number;
    ClassID?: number;
}

export const initialCurrentUserState: CurrentUserState = {
    UserID: -1,
    Email: "",
    Name: "",
    Surname: "",
    UserRoleID: -1
}
