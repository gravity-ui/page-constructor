import React from 'react';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import Source from '../Source/Source';
import ViewSwitches from '../ViewSwitches/ViewSwitches';

import './TopBar.scss';

const b = block('topbar');

interface TopBarProps extends ClassNameProps {
    onZoomUpdate: (zoom: number) => void;
    onDecreaseZoom: () => void;
    onIncreaseZoom: () => void;
    zoom: number;
}

const TopBar: React.FC<TopBarProps> = ({
    zoom,
    onDecreaseZoom,
    onIncreaseZoom,
    onZoomUpdate,
    className,
}) => {
    return (
        <div className={b(null, className)}>
            <div className={b('switches')}>
                <ViewSwitches
                    onZoomUpdate={onZoomUpdate}
                    onDecreaseZoom={onDecreaseZoom}
                    onIncreaseZoom={onIncreaseZoom}
                    zoom={zoom}
                />
            </div>
            <Source className={b('source')} />
        </div>
    );
};

export default TopBar;
