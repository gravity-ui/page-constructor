import {ArrowDownToSquare} from '@gravity-ui/icons';
import {Button, ClipboardButton, Icon} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import _ from 'lodash';
import * as React from 'react';

import {PageContentWithNavigation} from '../../../models';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {generateChildrenPathFromArray} from '../../utils';
import {editorCn} from '../../utils/cn';

import './SourceCode.scss';
import {UpdateModal} from './UpdateModal/UpdateModal';

const b = editorCn('source-code');

interface SourceCodeProps {
    className?: string;
    format: 'yaml' | 'json';
    showSelectedBlockOnly?: boolean;
}

const SourceCode = ({className, format, showSelectedBlockOnly = false}: SourceCodeProps) => {
    const {content, setContent, selectedBlock} = useMainEditorStore();
    const [isOpen, setIsOpen] = React.useState(false);

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

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{format}</div>
            <div className={b('code')}>
                <div className={b('content')}>{textContent}</div>
                <div className={b('controls')}>
                    <ClipboardButton view="flat" size="xs" text={textContent} />
                    <Button view="flat" size="xs" onClick={() => setIsOpen(true)}>
                        <Icon size={14} data={ArrowDownToSquare} />
                    </Button>
                </div>
            </div>
            <UpdateModal onApply={handleUpdate} onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </div>
    );
};

export default SourceCode;
