import React, {MouseEventHandler, useMemo} from 'react';

import {block} from '../../../utils';
import {NavigationItemType, NavigationItemData} from '../../../models';
import SocialIcon from '../SocialIcon/SocialIcon';

import {NavigationButton} from './components/NavigationButton';
import {NavigationDropdown} from './components/NavigationDropdown';
import {NavigationLink} from './components/NavigationLink';
import {GithubStars} from './components/GithubStars';

import './NavigationItem.scss';

const b = block('navigation-item');

export interface NavigationItemProps {
    data: NavigationItemData;
    className?: string;
    onClick?: MouseEventHandler;
    isOpened?: boolean;
}

//todo: add types support form component in map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationItemsMap: Record<NavigationItemType, React.ComponentType<any>> = {
    [NavigationItemType.Button]: NavigationButton,
    [NavigationItemType.Social]: SocialIcon,
    [NavigationItemType.Dropdown]: NavigationDropdown,
    [NavigationItemType.Link]: NavigationLink,
    [NavigationItemType.Github]: GithubStars,
};

const NavigationItem: React.FC<NavigationItemProps> = ({data, className, ...props}) => {
    const {type = NavigationItemType.Link} = data;
    const Component = NavigationItemsMap[type];
    const componentProps = useMemo(
        () => ({
            className: b({type}, className),
            ...data,
            ...props,
        }),
        [className, data, props, type],
    );

    return <Component {...componentProps} />;
};

export default NavigationItem;
