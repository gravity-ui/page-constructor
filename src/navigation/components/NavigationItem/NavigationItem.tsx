import React, {useMemo} from 'react';

import omit from 'lodash/omit';

import {BlockIdContext} from '../../../context/blockIdContext';
import {CustomItem, NavigationItemType} from '../../../models';
import {block} from '../../../utils';
import {NavigationItemProps} from '../../models';

import {useNavItemMap} from './hooks/useNavItemMap';

import './NavigationItem.scss';

const b = block('navigation-item');

const ANALYTICS_ID = 'navigation';

const NavigationItem: React.FC<NavigationItemProps> = ({
    data,
    className,
    menuLayout,
    ...props
}: NavigationItemProps) => {
    const {type = NavigationItemType.Link} = data;
    const navItemMap = useNavItemMap();
    const Component = navItemMap[type] as CustomItem;
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
                <Component {...componentProps} className={b('content', {type})} />
            </li>
        </BlockIdContext.Provider>
    );
};

export default NavigationItem;
