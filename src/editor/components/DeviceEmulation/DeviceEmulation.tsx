import * as React from 'react';

import {ViewModeItem} from '../../types';

import DeviceEmulationMobile from './DeviceEmulationMobile/DeviceEmulationMobile';
import {isMobileDevice, mobileDevices} from './utils';

export interface DeviceEmulationProps extends React.PropsWithChildren {
    mode: ViewModeItem;
}

const DeviceEmulation = ({children, mode}: DeviceEmulationProps) => (
    <React.Fragment>
        {!isMobileDevice(mode) && children}
        {mobileDevices.map((device) => (
            <DeviceEmulationMobile key={device} device={device} active={mode === device}>
                {children}
            </DeviceEmulationMobile>
        ))}
    </React.Fragment>
);

export default DeviceEmulation;
