import * as React from 'react';
import {Display, Minus, Plus, Smartphone} from '@gravity-ui/icons';
import {Button, Icon, SegmentedRadioGroup, Select} from '@gravity-ui/uikit';

import {ZOOM_STEPS} from '../../constants';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './ViewSwitches.scss';

const b = editorCn('view-switches');

/**
 * Device option type definition
 */
interface DeviceOption {
    /** React node to display as the option label */
    label: React.ReactNode;
    /** Device width value (e.g., '100%', '768px') */
    value: string;
    /** Descriptive name for accessibility */
    ariaLabel: string;
}

/**
 * Available device viewport options
 * - Desktop: 100% width
 * - Tablet: 768px width
 * - Mobile: 576px width
 */
const DEVICE_OPTIONS: DeviceOption[] = [
    {
        label: <Icon data={Display} />,
        value: '100%',
        ariaLabel: 'Desktop view',
    },
    {
        label: <Icon data={Smartphone} />,
        value: '768px',
        ariaLabel: 'Tablet view',
    },
    {
        label: <Icon width={14} data={Smartphone} />,
        value: '576px',
        ariaLabel: 'Mobile view',
    },
];

const ViewSwitches: React.FC = () => {
    const {zoom, setZoom, decreaseZoom, increaseZoom, deviceWidth, setDeviceWidth} =
        useMainEditorStore();

    // Memoize zoom options to prevent unnecessary recalculations
    const zoomOptions = React.useMemo(
        () =>
            ZOOM_STEPS.map((step) => ({
                value: String(step),
                content: `${step}%`,
            })),
        [],
    );

    // Memoize current zoom value for Select component
    const currentZoomValue = React.useMemo(() => [String(zoom)], [zoom]);

    // Create stable callback for zoom updates
    const handleZoomUpdate = React.useCallback(
        (value: string | string[]) => {
            const newZoom = Number(Array.isArray(value) ? value[0] : value);
            if (!isNaN(newZoom) && ZOOM_STEPS.includes(newZoom)) {
                setZoom(newZoom);
            }
        },
        [setZoom],
    );

    return (
        <div className={b()} role="toolbar" aria-label="View controls">
            <SegmentedRadioGroup
                value={deviceWidth}
                onUpdate={setDeviceWidth}
                aria-label="Device viewport selector"
            >
                {DEVICE_OPTIONS.map(({value, label, ariaLabel}) => (
                    <SegmentedRadioGroup.Option key={value} value={value} aria-label={ariaLabel}>
                        {label}
                    </SegmentedRadioGroup.Option>
                ))}
            </SegmentedRadioGroup>

            <div className={b('zoom')} role="group" aria-label="Zoom controls">
                <Button
                    view="flat"
                    onClick={decreaseZoom}
                    aria-label="Decrease zoom"
                    disabled={zoom <= Math.min(...ZOOM_STEPS)}
                >
                    <Icon data={Minus} />
                </Button>

                <Select
                    className={b('zoom-select')}
                    multiple={false}
                    value={currentZoomValue}
                    options={zoomOptions}
                    onUpdate={handleZoomUpdate}
                    aria-label="Select zoom level"
                    width="max"
                />

                <Button
                    view="flat"
                    onClick={increaseZoom}
                    aria-label="Increase zoom"
                    disabled={zoom >= Math.max(...ZOOM_STEPS)}
                >
                    <Icon data={Plus} />
                </Button>
            </div>
        </div>
    );
};

export default React.memo(ViewSwitches);
