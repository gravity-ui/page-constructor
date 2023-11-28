import React, {useMemo} from 'react';

import omit from 'lodash/omit';

import {BlockIdContext} from '../../../context/blockIdContext';
import {CustomItem, NavigationItemType} from '../../../models';
import {block} from '../../../utils';
import {NavigationItemProps} from '../../models';

import {useNavigationItemMap} from './hooks/useNavigationItemMap';

import './NavigationItem.scss';

const b = block('navigation-item');

const ANALYTICS_ID = 'navigation';

const navigationItemTypeValues = Object.values(NavigationItemType);
const directNavigationItemTypeValues = navigationItemTypeValues;
directNavigationItemTypeValues.splice(
    directNavigationItemTypeValues.indexOf(NavigationItemType.Dropdown),
    1,
);

const NavigationItem: React.FC<NavigationItemProps> = ({
    data,
    className,
    menuLayout,
    ...props
}: NavigationItemProps) => {
    const {type = NavigationItemType.Link} = data;
    const navItemMap = useNavigationItemMap();
    const Component = navItemMap[type] as CustomItem;
    const componentProps = useMemo(() => {
        const componentProperties = {
            ...data,
            ...props,
        };

        if (directNavigationItemTypeValues.includes(type)) {
            return omit(componentProperties, 'hidePopup', 'isActive');
        }

        return componentProperties;
    }, [data, props, type]);

    return (
        <BlockIdContext.Provider value={ANALYTICS_ID}>
            <li className={b({'menu-layout': menuLayout}, className)}>
                <Component {...componentProps} className={b('content', {type})} />
            </li>
        </BlockIdContext.Provider>
    );
};

export default NavigationItem;
