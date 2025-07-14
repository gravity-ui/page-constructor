import {Pencil} from '@gravity-ui/icons';
import {Button, ClipboardButton, Icon, SegmentedRadioGroup} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import _ from 'lodash';
import * as React from 'react';

import {PageContentWithNavigation} from '../../../models';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {generateChildrenPathFromArray} from '../../utils';
import {editorCn} from '../../utils/cn';
import {UpdateModal} from './UpdateModal/UpdateModal';
import {MessageCard} from '../../components/MessageCard/MessageCard';
import {MESSAGES} from '../../constants/messages';

import './SourceCode.scss';

const b = editorCn('source-code');

interface SourceCodeProps {
    className?: string;
    showSelectedBlockOnly?: boolean;
}

const formatOptions = [
    {value: 'yaml', content: 'YAML'},
    {value: 'json', content: 'JSON'},
];

const SourceCode = ({className, showSelectedBlockOnly = false}: SourceCodeProps) => {
    const {content, setContent, selectedBlock} = useMainEditorStore();
    const [isOpen, setIsOpen] = React.useState(false);
    const [format, setFormat] = React.useState<'yaml' | 'json'>('yaml');

    const handleUpdate = (tempConfig: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let object: any;

        try {
            if (tempConfig.trim().startsWith('{') && tempConfig.trim().endsWith('}')) {
                object = JSON.parse(tempConfig);
            } else {
                object = yaml.load(tempConfig);
            }
        } catch {
            // eslint-disable-next-line no-console
            console.error('JSON.parse failed');
            return;
        }

        if (showSelectedBlockOnly && selectedBlock) {
            // Update only the selected block
            const currentBlockPath = generateChildrenPathFromArray(selectedBlock);
            const newContent = _.cloneDeep(content);
            _.set(newContent.blocks, currentBlockPath, object);
            setContent(newContent);
        } else if (object) {
            // Update the entire content
            setContent(object as PageContentWithNavigation);
        }

        setIsOpen(false);
    };

    const textContent = React.useMemo(() => {
        if (showSelectedBlockOnly && selectedBlock) {
            const currentBlockPath = generateChildrenPathFromArray(selectedBlock);
            const currentConfig = _.get(content.blocks, currentBlockPath || '');

            if (currentConfig) {
                return format === 'yaml'
                    ? yaml.dump(currentConfig)
                    : JSON.stringify(currentConfig, null, 2);
            }

            return 'No block selected';
        }

        return format === 'yaml' ? yaml.dump(content) : JSON.stringify(content, null, 2);
    }, [format, content, showSelectedBlockOnly, selectedBlock]);

    if (!selectedBlock && showSelectedBlockOnly) {
        return (
            <div className={b(null, className)}>
                <MessageCard
                    title={MESSAGES.NO_BLOCK_SELECTED.title}
                    description={MESSAGES.NO_BLOCK_SELECTED.description}
                    theme="info"
                />
            </div>
        );
    }

    return (
        <div className={b(null, className)}>
            <div className={b('header')}>
                <SegmentedRadioGroup
                    size="m"
                    value={format}
                    options={formatOptions}
                    onUpdate={(value: string) => setFormat(value as 'yaml' | 'json')}
                />
                <div className={b('controls')}>
                    <Button view="outlined" size="m" onClick={() => setIsOpen(true)}>
                        <Icon size={14} data={Pencil} />
                        Edit
                    </Button>
                    <ClipboardButton view="outlined" size="m" text={textContent} />
                </div>
            </div>
            <div className={b('code')}>
                <div className={b('content')}>{textContent}</div>
            </div>
            <UpdateModal
                onApply={handleUpdate}
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                initialConfig={textContent}
            />
        </div>
    );
};

export default SourceCode;
