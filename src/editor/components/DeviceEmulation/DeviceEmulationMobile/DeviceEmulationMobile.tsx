import * as React from 'react';

import {block} from '../../../../utils';
import {EditorContext} from '../../../context';
import {DeviceIframe} from '../../../widget';
import {MobileDevice} from '../utils';

import './DeviceEmulationMobile.scss';

const b = block('device-emulation-mobile');

interface DeviceEmulationMobileProps extends React.PropsWithChildren {
    device: MobileDevice;
    active: boolean;
}

const DeviceEmulationMobile = ({device, active}: DeviceEmulationMobileProps) => {
    const {deviceEmulationSettings, ...initialData} = React.useContext(EditorContext);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const deviceIframeRef = React.useRef<DeviceIframe | null>(null);

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (deviceIframeRef.current) {
            deviceIframeRef.current.onActivenessUpdate(active);
        }
    }, [active]);

    React.useEffect(() => {
        if (deviceIframeRef.current && initialData) {
            deviceIframeRef.current.onDataUpdate(initialData);
        }
    }, [initialData]);

    return <div className={b({active, device})} ref={containerRef} />;
};

export default DeviceEmulationMobile;
