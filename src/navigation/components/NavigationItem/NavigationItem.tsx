import React, {MouseEventHandler, useMemo} from 'react';

import {NavigationItemType, NavigationItemData} from '../../../models';
import SocialIcon from '../SocialIcon/SocialIcon';

import {NavigationButton} from './components/NavigationButton/NavigationButton';
import {NavigationDropdown} from './components/NavigationDropdown/NavigationDropdown';
import {NavigationLink} from './components/NavigationLink/NavigationLink';
import {GithubStars} from './components/GithubStars/GithubStars';

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
    [NavigationItemType.GithubStars]: GithubStars,
};

const NavigationItem: React.FC<NavigationItemProps> = ({data, className, ...props}) => {
    const {type = NavigationItemType.Link} = data;
    const Component = NavigationItemsMap[type];
    const componentProps = useMemo(
        () => ({
            className,
            ...data,
            ...props,
        }),
        [className, data, props],
    );

    return <Component {...componentProps} />;
};

export default NavigationItem;
