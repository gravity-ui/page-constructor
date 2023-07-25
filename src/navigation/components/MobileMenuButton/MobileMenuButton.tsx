import React, {MouseEvent} from 'react';

import {Control} from '../../../components';
import {NavigationClose, NavigationOpen} from '../../../icons';
import {block} from '../../../utils';
import {MobileMenuButtonProps} from '../../models';

import './MobileMenuButton.scss';

const b = block('mobile-menu-button');

const ICON_SIZE = 36;

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
    isSidebarOpened,
    onSidebarOpenedChange,
}) => (
    <Control
        className={b()}
        onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onSidebarOpenedChange(!isSidebarOpened);
        }}
        size="l"
        icon={isSidebarOpened ? NavigationClose : NavigationOpen}
        iconSize={ICON_SIZE}
    />
);
