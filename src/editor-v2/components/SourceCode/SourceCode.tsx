import React, {useState} from 'react';

import {Button, Dialog, TextArea} from '@gravity-ui/uikit';

import {ClassNameProps, PageContent} from '../../../models';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig/hooks/useContentConfigStore';

import './SourceCode.scss';

const b = block('source-code');

interface SourceCodeProps extends ClassNameProps {}

const SourceCode: React.FC<SourceCodeProps> = ({className}) => {
    const {config, setConfig} = useContentConfigStore();
    const [isOpen, setIsOpen] = useState(false);
    const [tempConfig, setTempConfig] = useState('');

    const onUpdate = () => {
        let object;

        try {
            object = JSON.parse(tempConfig);
        } catch {
            // eslint-disable-next-line no-console
            console.error('JSON.parse failed');
        }

        setConfig(object as PageContent);
        setIsOpen(false);
    };

    return (
        <div className={b(null, className)}>
            <Button onClick={() => setIsOpen(true)}>Update</Button>
            <div className={b('code')}>{JSON.stringify(config, null, 2)}</div>

            <Dialog onClose={() => setIsOpen(false)} open={isOpen} size={'l'}>
                <Dialog.Header caption="New configuration" />
                <Dialog.Body>
                    <TextArea
                        className={b('textarea')}
                        value={tempConfig}
                        onUpdate={setTempConfig}
                        rows={30}
                    />
                </Dialog.Body>
                <Dialog.Footer
                    showError={false}
                    listenKeyEnter={true}
                    preset={'default'}
                    textButtonApply={'Apply'}
                    textButtonCancel={'Cancel'}
                    onClickButtonApply={onUpdate}
                    onClickButtonCancel={() => setIsOpen(false)}
                />
            </Dialog>
        </div>
    );
};

export default SourceCode;
