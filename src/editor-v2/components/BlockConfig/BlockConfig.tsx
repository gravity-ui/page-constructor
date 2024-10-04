import React from 'react';

import _ from 'lodash';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig';
import {useEditorStore} from '../../context/editorContext';
import {generateChildrenPathFromArray} from '../../utils';
import DynamicForm, {DynamicFormValue} from '../DynamicForm/DynamicForm';

import './BlockConfig.scss';

const b = block('block-config');

interface BlockConfigProps extends ClassNameProps {}

const BlockConfig: React.FC<BlockConfigProps> = ({className}) => {
    const {selectedBlock} = useEditorStore();
    const {config, blocks, subBlocks, updateField} = useContentConfigStore();

    const currentBlockPath = selectedBlock?.path
        ? generateChildrenPathFromArray(selectedBlock?.path)
        : '[]';

    const currentConfig = _.get(config.blocks, currentBlockPath || '');
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
