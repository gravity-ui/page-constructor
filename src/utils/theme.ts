import {DEFAULT_THEME} from '../components/constants';

export interface ThemedValue<T> extends Partial<Record<string, T>> {
    [DEFAULT_THEME]: T;
}

export type ThemeSupporting<T> = T | ThemedValue<T>;

export function isThemedValue<T>(value: ThemeSupporting<T>): value is ThemedValue<T> {
    return typeof value === 'object' && value !== null && DEFAULT_THEME in value;
}

export function getThemedValue<T>(value: ThemeSupporting<T>, theme = DEFAULT_THEME) {
    if (isThemedValue(value)) {
        return value[theme] || value[DEFAULT_THEME];
    } else {
        return value;
    }
}
