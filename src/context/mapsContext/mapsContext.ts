import * as React from 'react';

export enum MapType {
    Yandex = 'yandex',
    Google = 'google',
}

export const Maplangs = {
    ru: 'ru_RU',
    en: 'en_US',
};

export interface MapsContextType {
    apiKey: string;
    type: MapType;
    scriptSrc: string;
    nonce?: string;
    setKey?: (newKey: string) => void;
}

export const initialMapValue = {
    apiKey: '',
    scriptSrc: '',
    type: MapType.Yandex,
};

export const MapsContext = React.createContext<MapsContextType>(initialMapValue);
