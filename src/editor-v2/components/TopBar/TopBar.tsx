import React from 'react';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import Source from '../Source/Source';
import ViewSwitches from '../ViewSwitches/ViewSwitches';

import './TopBar.scss';

const b = block('topbar');

interface TopBarProps extends ClassNameProps {}

const TopBar: React.FC<TopBarProps> = ({className}) => {
    return (
        <div className={b(null, className)}>
            <div className={b('switches')}>
                <ViewSwitches />
            </div>
            <Source className={b('source')} />
        </div>
    );
};

export default TopBar;
