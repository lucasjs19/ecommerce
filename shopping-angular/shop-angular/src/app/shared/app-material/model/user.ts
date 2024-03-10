import { UserGroup } from "./userGroup";

export interface User {
    id: number | null;
    login: string;
    password: string;
    userGroup: UserGroup
}
