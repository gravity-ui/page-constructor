import React from 'react';
import {Platform} from './constants';

export interface History {
    action: 'PUSH' | 'POP' | 'REPLACE' | '';
    replace(location: Partial<Location>): void;
    push(location: Partial<Location>): void;
    goBack(): void;
    length: number;
}

export interface Location {
    pathname: string;
    search: string;
    hash: string;
}

export interface MobileAppContextProps {
    mobile: boolean;
    platform: Platform;
    useHistory: () => History;
    useLocation: () => Location;
    setMobile: (mobile: boolean, platform?: Platform) => void;
    setPlatform: (platform: Platform) => void;
}

const initialValue: MobileAppContextProps = {
    mobile: false,
    platform: Platform.BROWSER,
    useHistory: () => ({action: '', replace() {}, push() {}, goBack() {}, length: 0}),
    useLocation: () => ({pathname: '', search: '', hash: ''}),
    setMobile: () => {},
    setPlatform: () => {},
};

export const MobileAppContext = React.createContext(initialValue);
