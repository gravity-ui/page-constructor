import React from 'react';

export interface UserAccount {
    uid: string;
    login: string;
    avatarId: string;
    displayName?: string;
    lang?: string;
    hasStaffLogin?: boolean;
}

export interface User extends UserAccount {
    accounts: UserAccount[];
    passportHost: string;
    avatarHost: string;
    status: string;
    yandexuid: string;
}

export type UserContextProps = Partial<User>;

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);
