import React from 'react';

import {DynamicFormValue} from '../../../common/types';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import DynamicForm from '../DynamicForm/DynamicForm';

import './GlobalConfig.scss';

const b = block('global-config');

interface GlobalConfigProps extends ClassNameProps {}

const GlobalConfig: React.FC<GlobalConfigProps> = ({className}) => {
    const {global, content, updateField} = useMainEditorStore();

    const onUpdate = (key: string, value: DynamicFormValue) => {
        updateField(key, value);
    };

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>Global Config</div>
            <DynamicForm contentConfig={content} blockConfig={global} onUpdate={onUpdate} />
        </div>
    );
};

export default GlobalConfig;
