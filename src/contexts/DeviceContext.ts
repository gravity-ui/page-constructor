import React from 'react';

import {WithDeviceProps} from '../models/common';

export type DeviceContextProps = Partial<WithDeviceProps>;

export const DeviceContext = React.createContext<DeviceContextProps>({} as DeviceContextProps);
