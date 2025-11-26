import * as React from 'react';

import {BREAKPOINTS} from '../constants';
import {useWindowWidth} from '../context/windowWidthContext';
import {Device} from '../models';
import {DeviceSupporting, isDeviceValue} from '../utils';

const getDeviceBreakpoints = (inclusive?: boolean): [tablet: number, mobile: number] => {
    const shift = inclusive ? 0 : -1;

    return [BREAKPOINTS.md + shift, BREAKPOINTS.sm + shift];
};

export function useDeviceValue<T>(value: DeviceSupporting<T>, inclusive?: boolean): T {
    const windowWidth = useWindowWidth();

    const [tablet, mobile] = React.useMemo(() => getDeviceBreakpoints(inclusive), [inclusive]);

    const isMobile = windowWidth <= mobile;
    const isTablet = windowWidth <= tablet;

    return React.useMemo<T>(() => {
        if (!isDeviceValue(value)) {
            return value;
        }

        switch (true) {
            case isMobile:
                return value[Device.Mobile];
            case isTablet:
                return value[Device.Tablet] ?? value[Device.Mobile];
            default:
                return value[Device.Desktop];
        }
    }, [isMobile, isTablet, value]);
}
