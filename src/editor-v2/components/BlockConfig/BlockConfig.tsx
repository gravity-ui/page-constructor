import React from 'react';

import _ from 'lodash';

import {DynamicFormValue} from '../../../common/types';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useMainEditorStore} from '../../context/editorStore';
import {generateChildrenPathFromArray} from '../../utils';
import DynamicForm from '../DynamicForm/DynamicForm';

import './BlockConfig.scss';

const b = block('block-config');

interface BlockConfigProps extends ClassNameProps {}

const BlockConfig: React.FC<BlockConfigProps> = ({className}) => {
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
