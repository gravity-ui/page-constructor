import _ from 'lodash';

import {DynamicFormValue} from '../../../common/types';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import {MessageCard} from '../../components/MessageCard';
import {MESSAGES} from '../../constants/messages';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {generateChildrenPathFromArray} from '../../utils';
import {editorCn} from '../../utils/cn';

import './BlockConfigForm.scss';

const b = editorCn('block-config-form');

interface BlockConfigFormProps {
    className?: string;
}

const BlockConfigForm = ({className}: BlockConfigFormProps) => {
    const {selectedBlock, content, blocks, subBlocks, updateField} = useMainEditorStore();

    const currentBlockPath = selectedBlock ? generateChildrenPathFromArray(selectedBlock) : '[]';

    const currentConfig = _.get(content.blocks, currentBlockPath || '');
    const currentSchema = [...blocks, ...subBlocks].find(({type}) => type === currentConfig?.type);

    const onUpdate = (key: string, value: DynamicFormValue) => {
        updateField('blocks' + currentBlockPath + '.' + key, value);
    };

    if (!currentConfig) {
        return (
            <div className={b({empty: true}, className)}>
                <MessageCard
                    title={MESSAGES.NO_BLOCK_SELECTED.title}
                    description={MESSAGES.NO_BLOCK_SELECTED.description}
                    theme="info"
                />
            </div>
        );
    }

    if (!currentSchema) {
        return (
            <div className={b({empty: true}, className)}>
                <MessageCard
                    title={MESSAGES.UNSUPPORTED_BLOCK.title}
                    description={MESSAGES.UNSUPPORTED_BLOCK.description}
                    theme="warning"
                />
            </div>
        );
    }

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{currentSchema.schema.name}</div>
            <div className={b('form')}>
                <DynamicForm
                    contentConfig={currentConfig}
                    blockConfig={currentSchema.schema.inputs}
                    onUpdateByKey={onUpdate}
                />
            </div>
        </div>
    );
};

export default BlockConfigForm;
