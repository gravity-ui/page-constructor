import React from 'react';

import {NavigationItemProps} from '../NavigationItem';
import {Content} from './Content';
import {ToggleArrow} from '../../../../components';

import {block} from '../../../../utils';
import {getMediaImage} from '../../../../components/Media/Image/utils';

import {DropdownItemData} from '../../../../models';

import '../NavigationItem.scss';

const b = block('navigation-item');

const TOGGLE_ARROW_SIZE = 12;

type NavigationDropdownProps = NavigationItemProps & DropdownItemData;

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    text,
    icon,
    isOpened,
    ...props
}) => {
    const iconData = icon && getMediaImage(icon);

    return (
        <span {...props}>
            <Content text={text} icon={iconData} />
            <ToggleArrow
                className={b('dropdown')}
                size={TOGGLE_ARROW_SIZE}
                type={'vertical'}
                iconType="navigation"
                open={isOpened}
            />
        </span>
    );
};
