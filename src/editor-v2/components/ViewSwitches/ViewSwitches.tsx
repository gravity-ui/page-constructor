import React from 'react';

import {Minus, Plus} from '@gravity-ui/icons';
import {Button, Icon, Select} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {ZOOM_STEPS} from '../../constants';

import './ViewSwitches.scss';

const b = block('view-switches');

interface ViewSwitchesProps extends ClassNameProps {
    onZoomUpdate: (zoom: number) => void;
    onDecreaseZoom: () => void;
    onIncreaseZoom: () => void;
    zoom: number;
}

const ViewSwitches: React.FC<ViewSwitchesProps> = ({
    zoom,
    onIncreaseZoom,
    onDecreaseZoom,
    onZoomUpdate,
    className,
}) => {
    return (
        <div className={b(null, className)}>
            <div className={b('zoom')}>
                <Button view={'flat'} onClick={onDecreaseZoom}>
                    <Icon data={Minus} />
                </Button>
                <Select
                    multiple={false}
                    value={[String(zoom)]}
                    options={ZOOM_STEPS.map((step) => ({
                        value: String(step),
                        content: `${String(step)}%`,
                    }))}
                    onUpdate={(value) => onZoomUpdate(Number(value))}
                />
                <Button view={'flat'} onClick={onIncreaseZoom}>
                    <Icon data={Plus} />
                </Button>
            </div>
        </div>
    );
};

export default ViewSwitches;
