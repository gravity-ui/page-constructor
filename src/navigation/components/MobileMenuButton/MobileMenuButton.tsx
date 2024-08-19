import React, {MouseEvent} from 'react';

import {Bars, Xmark} from '@gravity-ui/icons';

import {Control} from '../../../components';
import {block} from '../../../utils';
import {MobileMenuButtonProps} from '../../models';

import './MobileMenuButton.scss';

const b = block('mobile-menu-button');

const ICON_SIZE = 24;

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
    isSidebarOpened,
    onSidebarOpenedChange,
}) => (
    <Control
        className={b()}
        onClick={(e: MouseEvent) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();

            onSidebarOpenedChange(!isSidebarOpened);
        }}
        size={'l'}
        icon={isSidebarOpened ? Xmark : Bars}
        iconSize={ICON_SIZE}
    />
);
