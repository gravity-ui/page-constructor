import {useContext} from 'react';

import isEmpty from 'lodash/isEmpty';

import {navItemMap as NavItemMapDefault} from '../../../../constructor-items';
import {InnerContext} from '../../../../context/innerContext';

export const useNavItemMap = () => {
    const {navItemMap} = useContext(InnerContext);

    return isEmpty(navItemMap) ? NavItemMapDefault : navItemMap;
};
