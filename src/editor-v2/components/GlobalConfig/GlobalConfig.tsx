import React from 'react';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig';
import DynamicForm, {DynamicFormValue} from '../DynamicForm/DynamicForm';

import './GlobalConfig.scss';

const b = block('global-config');

interface GlobalConfigProps extends ClassNameProps {}

const GlobalConfig: React.FC<GlobalConfigProps> = ({className}) => {
    const {global, updateField, config} = useContentConfigStore();

    const onUpdate = (key: string, value: DynamicFormValue) => {
        updateField(key, value);
    };

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>Global Config</div>
            <DynamicForm contentConfig={config} blockConfig={global} onUpdate={onUpdate} />
        </div>
    );
};

export default GlobalConfig;
