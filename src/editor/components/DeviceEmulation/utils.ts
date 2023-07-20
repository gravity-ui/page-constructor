import {ViewModeItem} from '../../types';

export type MobileDevice = ViewModeItem.Mobile | ViewModeItem.Tablet;

export const mobileDevices = [ViewModeItem.Tablet, ViewModeItem.Mobile] as const;

export const isMobileDevice = (mode: ViewModeItem): mode is MobileDevice =>
    [ViewModeItem.Tablet, ViewModeItem.Mobile].includes(mode as MobileDevice);
