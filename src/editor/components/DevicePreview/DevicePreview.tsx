import React, {Fragment, PropsWithChildren, useContext, useEffect, useRef} from 'react';

import {block} from '../../../utils';
import {EditorContext} from '../../context';
import {ViewModeItem} from '../../types';
import {DeviceIframe} from '../../widget';

import './DevicePreview.scss';

const b = block('device-preview');

export interface DevicePreviewProps extends PropsWithChildren {
    mode: ViewModeItem;
}

type MobileDevice = ViewModeItem.Mobile | ViewModeItem.Tablet;

const mobileDevices = [ViewModeItem.Tablet, ViewModeItem.Mobile] as const;
const isMobileDevice = (mode: ViewModeItem): mode is MobileDevice =>
    mobileDevices.includes(mode as MobileDevice);

interface DevicePreviewMobileProps extends PropsWithChildren {
    device: MobileDevice;
    active: boolean;
}

const DevicePreviewMobile = ({device, active}: DevicePreviewMobileProps) => {
    const {data} = useContext(EditorContext);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const deviceIframeRef = useRef<DeviceIframe | null>(null);

    useEffect(() => {
        let iframe: DeviceIframe;

        if (containerRef?.current) {
            iframe = new DeviceIframe(containerRef?.current, {
                initialData: data,
                className: b('frame', {device}),
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
        if (deviceIframeRef.current && data) {
            deviceIframeRef.current.onDataUpdate(data);
        }
    }, [data]);

    return <div className={b({active, device})} ref={containerRef} />;
};

const DevicePreview = ({children, mode}: DevicePreviewProps) => {
    return (
        <Fragment>
            {!isMobileDevice(mode) && children}
            {mobileDevices.map((device) => (
                <DevicePreviewMobile key={device} device={device} active={mode === device}>
                    {children}
                </DevicePreviewMobile>
            ))}
        </Fragment>
    );
};

export default DevicePreview;
