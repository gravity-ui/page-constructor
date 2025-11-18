import {Device} from '../models';

export interface ValueWithDevice<T> extends Partial<Record<Device, T>> {
    [Device.Desktop]: T;
    [Device.Mobile]: T;
}

export type DeviceSupporting<T> = T | ValueWithDevice<T>;

export function isDeviceValue<T>(value: DeviceSupporting<T>): value is ValueWithDevice<T> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Device.Desktop in value &&
        Device.Mobile in value
    );
}
