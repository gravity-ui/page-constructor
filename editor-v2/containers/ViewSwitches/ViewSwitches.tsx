import {Minus, Plus} from '@gravity-ui/icons';
import {Button, Icon, Select} from '@gravity-ui/uikit';
import React from 'react';

import {ZOOM_STEPS} from '../../constants';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './ViewSwitches.scss';

const b = editorCn('view-switches');

const ViewSwitches = () => {
    const {zoom, setZoom, decreaseZoom, increaseZoom} = useMainEditorStore();
    return (
        <div className={b()}>
            <div>TBD screen sizes</div>
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
