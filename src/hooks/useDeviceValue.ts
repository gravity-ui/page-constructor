import * as React from 'react';

import {BREAKPOINTS} from '../constants';
import {useWindowWidth} from '../context/windowWidthContext';
import {Device} from '../models';
import {DeviceSupporting, isDeviceValue} from '../utils';

const getDeviceBreakpoints = (
    inclusive?: boolean,
): [desktopSm: number, tablet: number, mobile: number] => {
    const shift = inclusive ? 0 : -1;

    return [BREAKPOINTS.lg + shift, BREAKPOINTS.md + shift, BREAKPOINTS.sm + shift];
};

export function useDeviceValue<T>(value: DeviceSupporting<T>, inclusive?: boolean): T {
    const windowWidth = useWindowWidth();

    const [desktopSm, tablet, mobile] = React.useMemo(
        () => getDeviceBreakpoints(inclusive),
        [inclusive],
    );

    const isMobile = windowWidth <= mobile;
    const isTablet = windowWidth <= tablet;
    const isDesktopSm = windowWidth <= desktopSm;

    return React.useMemo<T>(() => {
        if (!isDeviceValue(value)) {
            return value;
        }

        switch (true) {
            case isMobile:
                return value[Device.Mobile];
            case isTablet:
                return value[Device.Tablet] ?? value[Device.Mobile];
            case isDesktopSm:
                return value[Device.DesktopSmall] ?? value[Device.Desktop];
            default:
                return value[Device.Desktop];
        }
    }, [isDesktopSm, isMobile, isTablet, value]);
}
