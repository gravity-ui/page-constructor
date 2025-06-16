import * as React from 'react';

import {Bars, Xmark} from '@gravity-ui/icons';

import {Control} from '../../../components';
import {block} from '../../../utils';
import {MobileMenuButtonProps} from '../../models';

import './MobileMenuButton.scss';

const b = block('mobile-menu-button');

const ICON_SIZE = 24;

export const MobileMenuButton = ({
    isSidebarOpened,
    onSidebarOpenedChange,
}: MobileMenuButtonProps) => (
    <Control
        className={b()}
        onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();

            onSidebarOpenedChange(!isSidebarOpened);
        }}
        size="l"
        icon={isSidebarOpened ? Xmark : Bars}
        iconSize={ICON_SIZE}
    />
);
