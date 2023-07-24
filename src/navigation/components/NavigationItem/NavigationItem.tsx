import React, {useMemo} from 'react';

import {omit} from 'lodash';

import {BlockIdContext} from '../../../context/blockIdContext';
import {NavigationItemType} from '../../../models';
import {block} from '../../../utils';
import {NavigationItemProps} from '../../models';
import SocialIcon from '../SocialIcon/SocialIcon';

import {GithubButton} from './components/GithubButton/GithubButton';
import {NavigationButton} from './components/NavigationButton/NavigationButton';
import {NavigationDropdown} from './components/NavigationDropdown/NavigationDropdown';
import {NavigationLink} from './components/NavigationLink/NavigationLink';

import './NavigationItem.scss';

const b = block('navigation-item');

const ANALYTICS_ID = 'navigation';

//todo: add types support form component in map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationItemsMap: Record<NavigationItemType, React.ComponentType<any>> = {
    [NavigationItemType.Button]: NavigationButton,
    [NavigationItemType.Social]: SocialIcon,
    [NavigationItemType.Dropdown]: NavigationDropdown,
    [NavigationItemType.Link]: NavigationLink,
    [NavigationItemType.GithubButton]: GithubButton,
};

const NavigationItem: React.FC<NavigationItemProps> = ({
    data,
    className,
    menuLayout,
    ...props
}: NavigationItemProps) => {
    const {type = NavigationItemType.Link} = data;
    const Component = NavigationItemsMap[type];
    const componentProps = useMemo(() => {
        const componentProperties = {
            ...data,
            ...props,
        };

        if (type !== NavigationItemType.Dropdown) {
            return omit(componentProperties, 'hidePopup', 'isActive');
        }

        return componentProperties;
    }, [data, props, type]);

    return (
        <BlockIdContext.Provider value={ANALYTICS_ID}>
            <li className={b({'menu-layout': menuLayout}, className)}>
                <Component {...componentProps} className={b('content')} />
            </li>
        </BlockIdContext.Provider>
    );
};

export default NavigationItem;
