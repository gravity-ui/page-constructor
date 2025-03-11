import {ArrowDownToSquare} from '@gravity-ui/icons';
import {Button, ClipboardButton, Icon} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import React, {useMemo, useState} from 'react';

import {Content} from '../../../src/models';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './SourceCode.scss';
import {UpdateModal} from './UpdateModal/UpdateModal';

const b = editorCn('source-code');

interface SourceCodeProps {
    className?: string;
    format: 'yaml' | 'json';
}

const SourceCode = ({className, format}: SourceCodeProps) => {
    const {content, setContent} = useMainEditorStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdate = (tempConfig: string) => {
        let object: Content | undefined;

        try {
            if (tempConfig.trim().startsWith('{') && tempConfig.trim().endsWith('}')) {
                object = JSON.parse(tempConfig);
            } else {
                object = yaml.load(tempConfig) as Content;
            }
        } catch {
            // eslint-disable-next-line no-console
            console.error('JSON.parse failed');
        }

        if (object) {
            setContent(object);
        }

        setIsOpen(false);
    };

    const textContent = useMemo(() => {
        return format === 'yaml' ? yaml.dump(content) : JSON.stringify(content, null, 2);
    }, [format, content]);

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
