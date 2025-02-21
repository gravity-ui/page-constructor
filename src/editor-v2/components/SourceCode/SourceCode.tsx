import React, {useState} from 'react';

import {ArrowDownToSquare, Copy, CopyCheck} from '@gravity-ui/icons';
import {
    Alert,
    Button,
    CopyToClipboard,
    Dialog,
    Icon,
    RadioButton,
    TextArea,
} from '@gravity-ui/uikit';
import yaml from 'js-yaml';

import {ClassNameProps, PageContent} from '../../../models';
import {block} from '../../../utils';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';

import './SourceCode.scss';

const b = block('source-code');

interface SourceCodeProps extends ClassNameProps {}

const SourceCode: React.FC<SourceCodeProps> = ({className}) => {
    const {content, setContent} = useMainEditorStore();
    const [isOpen, setIsOpen] = useState(false);
    const [tempConfig, setTempConfig] = useState('');
    const [format, setFormat] = useState<'yaml' | 'json'>('yaml');

    const onUpdate = () => {
        let object;

        try {
            if (tempConfig.trim().startsWith('{') && tempConfig.trim().endsWith('}')) {
                object = JSON.parse(tempConfig);
            } else {
                object = yaml.load(tempConfig);
            }
        } catch {
            // eslint-disable-next-line no-console
            console.error('JSON.parse failed');
        }

        if (object) {
            setContent(object as PageContent);
        }

        setIsOpen(false);
    };

    const text = format === 'yaml' ? yaml.dump(content) : JSON.stringify(content, null, 2);

    return (
        <div className={b(null, className)}>
            <div className={b('head')}>
                <RadioButton value={format} onUpdate={setFormat}>
                    <RadioButton.Option value={'yaml'} content={'YAML'} />
                    <RadioButton.Option value={'json'} content={'JSON'} />
                </RadioButton>
                <CopyToClipboard text={text} timeout={1000}>
                    {(status) => (
                        <Button>
                            {status === 'pending' ? (
                                <Icon data={Copy} />
                            ) : (
                                <Icon data={CopyCheck} />
                            )}
                            Copy
                        </Button>
                    )}
                </CopyToClipboard>
                <Button onClick={() => setIsOpen(true)}>
                    <Icon data={ArrowDownToSquare} />
                    Import
                </Button>
            </div>

            <div className={b('code')}>{text}</div>

            <Dialog onClose={() => setIsOpen(false)} open={isOpen} size={'l'}>
                <Dialog.Header caption="New configuration" />
                <Dialog.Body>
                    <Alert
                        className={b('alert')}
                        theme={'info'}
                        title={'You can use YAML or JSON'}
                        message={'The editor will automatically understand which format is needed.'}
                    ></Alert>
                    <TextArea
                        className={b('textarea')}
                        value={tempConfig}
                        onUpdate={setTempConfig}
                        rows={25}
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
