import React, {MouseEventHandler, useMemo} from 'react';

import {BlockIdContext} from '../../../context/blockIdContext';
import {NavigationItemData, NavigationItemType} from '../../../models';
import SocialIcon from '../SocialIcon/SocialIcon';

import {GithubButton} from './components/GithubButton/GithubButton';
import {NavigationButton} from './components/NavigationButton/NavigationButton';
import {NavigationDropdown} from './components/NavigationDropdown/NavigationDropdown';
import {NavigationLink} from './components/NavigationLink/NavigationLink';

const ANALYTICS_ID = 'navigation';

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
    [NavigationItemType.GithubButton]: GithubButton,
};

const NavigationItem = React.forwardRef<HTMLElement, NavigationItemProps>(
    ({data, className, ...props}, ref) => {
        const {type = NavigationItemType.Link} = data;
        const Component = NavigationItemsMap[type];
        const componentProps = useMemo(
            () => ({
                className,
                ...data,
                ...props,
                ref,
            }),
            [className, data, props, ref],
        );

        return (
            <BlockIdContext.Provider value={ANALYTICS_ID}>
                <Component {...componentProps} />
            </BlockIdContext.Provider>
        );
    },
);
NavigationItem.displayName = 'NavigationItem';

export default NavigationItem;
