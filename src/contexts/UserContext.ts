import React from 'react';

export interface UserAccount {
    uid: string;
    login: string;
    displayName?: string;
    avatarId: string;
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

export type UserContextProps = User | null;

export const UserContext = React.createContext<UserContextProps>(null);
