import {Display, Minus, Plus, Smartphone} from '@gravity-ui/icons';
import {Button, Icon, SegmentedRadioGroup, Select} from '@gravity-ui/uikit';

import {ZOOM_STEPS} from '../../constants';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './ViewSwitches.scss';

const b = editorCn('view-switches');

const DEVICE_OPTIONS = [
    {label: <Icon data={Display} />, value: '100%'},
    {label: <Icon data={Smartphone} />, value: '768px'},
    {label: <Icon width={14} data={Smartphone} />, value: '576px'},
];

const ViewSwitches = () => {
    const {zoom, setZoom, decreaseZoom, increaseZoom, deviceWidth, setDeviceWidth} =
        useMainEditorStore();

    return (
        <div className={b()}>
            <SegmentedRadioGroup value={deviceWidth} onUpdate={setDeviceWidth}>
                {DEVICE_OPTIONS.map(({value, label}) => (
                    <SegmentedRadioGroup.Option value={value}>{label}</SegmentedRadioGroup.Option>
                ))}
            </SegmentedRadioGroup>
            <div className={b('zoom')}>
                <Button view={'flat'} onClick={decreaseZoom}>
                    <Icon data={Minus} />
                </Button>
                <Select
                    multiple={false}
                    value={[String(zoom)]}
                    options={ZOOM_STEPS.map((step) => ({
                        value: String(step),
                        content: `${String(step)}%`,
                    }))}
                    onUpdate={(value) => setZoom(Number(value))}
                />
                <Button view={'flat'} onClick={increaseZoom}>
                    <Icon data={Plus} />
                </Button>
            </div>
        </div>
    );
};

export default ViewSwitches;
