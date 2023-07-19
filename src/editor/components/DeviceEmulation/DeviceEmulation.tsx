import React, {Fragment, PropsWithChildren, useContext, useEffect, useRef} from 'react';

import {block} from '../../../utils';
import {EditorContext} from '../../context';
import {ViewModeItem} from '../../types';
import {DeviceIframe} from '../../widget';

import './DeviceEmulation.scss';

const b = block('device-emulation');

export interface DeviceEmulationProps extends PropsWithChildren {
    mode: ViewModeItem;
}

type MobileDevice = ViewModeItem.Mobile | ViewModeItem.Tablet;

const mobileDevices = [ViewModeItem.Tablet, ViewModeItem.Mobile] as const;
const isMobileDevice = (mode: ViewModeItem): mode is MobileDevice =>
    mobileDevices.includes(mode as MobileDevice);

interface DeviceEmulationMobileProps extends PropsWithChildren {
    device: MobileDevice;
    active: boolean;
}

const DeviceEmulationMobile = ({device, active}: DeviceEmulationMobileProps) => {
    const {deviceEmulationSettings, ...initialData} = useContext(EditorContext);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const deviceIframeRef = useRef<DeviceIframe | null>(null);

    useEffect(() => {
        let iframe: DeviceIframe;

        if (containerRef?.current) {
            iframe = new DeviceIframe(containerRef?.current, {
                initialData,
                className: b('frame', {device}),
                settings: deviceEmulationSettings,
            });
            deviceIframeRef.current = iframe;
        }

        return () => {
            iframe?.destroy();
        };
        // render iframe only once, then update it's data with postMessage
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device]);

    useEffect(() => {
        if (deviceIframeRef.current) {
            deviceIframeRef.current.onActivenessUpdate(active);
        }
    }, [active]);

    useEffect(() => {
        if (deviceIframeRef.current && initialData) {
            deviceIframeRef.current.onDataUpdate(initialData);
        }
    }, [initialData]);

    return <div className={b({active, device})} ref={containerRef} />;
};

const DeviceEmulation = ({children, mode}: DeviceEmulationProps) => {
    return (
        <Fragment>
            {!isMobileDevice(mode) && children}
            {mobileDevices.map((device) => (
                <DeviceEmulationMobile key={device} device={device} active={mode === device}>
                    {children}
                </DeviceEmulationMobile>
            ))}
        </Fragment>
    );
};

export default DeviceEmulation;
