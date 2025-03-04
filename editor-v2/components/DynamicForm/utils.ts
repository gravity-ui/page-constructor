import _ from 'lodash';

import {PageContent} from '../../../src/models';

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

export const getContent = (contentConfig: PageContent, path: string) => {
    return path ? _.get(contentConfig, path) : contentConfig;
};
