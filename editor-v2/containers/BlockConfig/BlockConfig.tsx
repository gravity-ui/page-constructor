import _ from 'lodash';
import React from 'react';

import {DynamicFormValue} from '../../../common/types';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {generateChildrenPathFromArray} from '../../utils';
import {editorCn} from '../../utils/cn';

import './BlockConfig.scss';

const b = editorCn('block-config');

interface BlockConfigProps {
    className?: string;
}

const BlockConfig = ({className}: BlockConfigProps) => {
    const {selectedBlock, content, blocks, subBlocks, updateField} = useMainEditorStore();

    const currentBlockPath = selectedBlock ? generateChildrenPathFromArray(selectedBlock) : '[]';

    const currentConfig = _.get(content.blocks, currentBlockPath || '');
    const currentSchema = [...blocks, ...subBlocks].find(({type}) => type === currentConfig?.type);

    const onUpdate = (key: string, value: DynamicFormValue) => {
        updateField('blocks' + currentBlockPath + '.' + key, value);
    };

    if (!currentConfig) {
        return <div className={b('empty')}>Select block for start</div>;
    }

    if (!currentSchema) {
        return <div className={b('empty')}>Not supported: {currentConfig.type}</div>;
    }

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{currentSchema.schema.name}</div>
            <DynamicForm
                contentConfig={currentConfig}
                blockConfig={currentSchema.schema.inputs}
                onUpdate={onUpdate}
            />
        </div>
    );
};

export default BlockConfig;
