import * as React from 'react';

import isEmpty from 'lodash/isEmpty';

import {navItemMap as NavItemMapDefault} from '../../../../constructor-items';
import {InnerContext} from '../../../../context/innerContext';

export const useNavigationItemMap = () => {
    const {navItemMap} = React.useContext(InnerContext);

    return isEmpty(navItemMap) ? NavItemMapDefault : navItemMap;
};
