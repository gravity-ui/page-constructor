import {Alert, Dialog, TextArea} from '@gravity-ui/uikit';
import * as React from 'react';

import {editorCn} from '../../../utils/cn';

import './UpdateModal.scss';

const b = editorCn('source-code-update-modal');

interface UpdateModalProps {
    onClose(): void;
    onApply(tempConfig?: string): void;
    isOpen: boolean;
}

export const UpdateModal = ({onClose, onApply, isOpen}: UpdateModalProps) => {
    const [tempConfig, setTempConfig] = React.useState('');
    const handleApply = () => {
        onApply(tempConfig);
    };
    return (
        <Dialog onClose={onClose} open={isOpen} size={'l'} className={b()}>
            <Dialog.Header caption="New configuration" />
            <Dialog.Body>
                <Alert
                    theme={'info'}
                    title={'You can use YAML or JSON'}
                    message={'The editor will automatically understand which format is needed.'}
                    className={b('alert')}
                ></Alert>
                <TextArea value={tempConfig} onUpdate={setTempConfig} rows={25} />
            </Dialog.Body>
            <Dialog.Footer
                showError={false}
                preset={'default'}
                textButtonApply={'Apply'}
                textButtonCancel={'Cancel'}
                onClickButtonApply={handleApply}
                onClickButtonCancel={onClose}
            />
        </Dialog>
    );
};
