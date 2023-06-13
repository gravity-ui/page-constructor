import {DynamicFormConfig, dynamicConfig as libConfig} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {OneOfCustom} from './components/OneOfCustom/OneOfCustom';

const getDynamicConfig = () => {
    const dynamicConfig: DynamicFormConfig = _.cloneDeep(libConfig);

    dynamicConfig.object.inputs['oneof_custom'] = {Component: OneOfCustom, independent: true};

    return dynamicConfig;
};

export const dynamicConfig = getDynamicConfig();
