import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import {HeaderData, ThemedNavigationLogoData} from '../models';

export function isLogoSet(logo?: ThemedNavigationLogoData): logo is ThemedNavigationLogoData {
    return Boolean(_get(logo, 'icon') || _get(logo, 'light.icon'));
}

export function isHeaderSet(header?: HeaderData): header is HeaderData {
    return !_isEmpty(header?.leftItems);
}
