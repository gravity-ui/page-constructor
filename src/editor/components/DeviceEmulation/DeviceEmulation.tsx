import React, {Fragment, PropsWithChildren} from 'react';

import {ViewModeItem} from '../../types';

import DeviceEmulationMobile from './DeviceEmulationMobile/DeviceEmulationMobile';
import {isMobileDevice, mobileDevices} from './utils';

export interface DeviceEmulationProps extends PropsWithChildren {
    mode: ViewModeItem;
}

const DeviceEmulation = ({children, mode}: DeviceEmulationProps) => (
    <Fragment>
        {!isMobileDevice(mode) && children}
        {mobileDevices.map((device) => (
            <DeviceEmulationMobile key={device} device={device} active={mode === device}>
                {children}
            </DeviceEmulationMobile>
        ))}
    </Fragment>
);

export default DeviceEmulation;
