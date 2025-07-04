import * as React from 'react';

import omit from 'lodash/omit';

import {BlockIdContext} from '../../../context/blockIdContext';
import {CustomItem, NavigationItemType, NavigationItemTypes} from '../../../models';
import {block} from '../../../utils';
import {NavigationItemProps} from '../../models';

import {useNavigationItemMap} from './hooks/useNavigationItemMap';

import './NavigationItem.scss';

const b = block('navigation-item');

const ANALYTICS_ID = 'navigation';

const nonComplexNavigationItemTypes = NavigationItemTypes.filter(
    (type) => type !== NavigationItemType.Dropdown,
);

export const NavigationItem = ({data, className, menuLayout, ...props}: NavigationItemProps) => {
    const {type = NavigationItemType.Link} = data;
    const navItemMap = useNavigationItemMap();
    const Component = navItemMap[type] as CustomItem;
    const componentProps = React.useMemo(() => {
        const componentProperties = {
            ...data,
            ...props,
        };

        if (
            nonComplexNavigationItemTypes.includes(
                type as (typeof nonComplexNavigationItemTypes)[number],
            )
        ) {
            return omit(componentProperties, 'hidePopup', 'isActive');
        }

        return NavigationItemTypes.includes(type)
            ? componentProperties
            : {...componentProperties, menuLayout};
    }, [data, props, type, menuLayout]);

    return (
        <BlockIdContext.Provider value={ANALYTICS_ID}>
            <li className={b({'menu-layout': menuLayout}, className)}>
                <Component {...componentProps} className={b('content', {type})} />
            </li>
        </BlockIdContext.Provider>
    );
};

export default NavigationItem;
