import {DynamicFormConfig, dynamicConfig as libConfig} from '@gravity-ui/dynamic-forms';
import cloneDeep from 'lodash/cloneDeep';

import {OneOfCustom} from './components/OneOfCustom/OneOfCustom';

const getDynamicConfig = () => {
    const dynamicConfig: DynamicFormConfig = cloneDeep(libConfig);

    // @ts-ignore
    dynamicConfig.object.inputs['oneof_custom'] = {Component: OneOfCustom, independent: true};

    return dynamicConfig;
};

export const dynamicConfig = getDynamicConfig();
