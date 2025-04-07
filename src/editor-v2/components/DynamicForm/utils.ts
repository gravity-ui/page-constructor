import _ from 'lodash';

import {DynamicFormValue} from '../../../../common/types';

export const getFullPath = (path: string, name: string) => {
    if (!path && !name) {
        return '';
    }

    if (!path) {
        return name;
    }

    if (!name) {
        return path;
    }

    return path + '.' + name;
};

export const getContent = (contentConfig: DynamicFormValue, path: string) => {
    return path ? _.get(contentConfig, path) : contentConfig;
};
