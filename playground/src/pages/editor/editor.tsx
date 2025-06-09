import * as React from 'react';
import block from 'bem-cn-lite';
import {useNavigate} from 'react-router';
import {Button, Text, ThemeProvider} from '@gravity-ui/uikit';

import {Editor} from '../../../../src/editor-v2';

import './editor.scss';

const b = block('editor');

const Other = () => {
    const navigate = useNavigate();

    return (
        <div className={b('other')}>
            <Text variant="subheader-2">Form Editor</Text>
            <Button onClick={() => navigate('/?page=form')}>Go to form editor</Button>
        </div>
    );
};

const COMPONENTS_CONFIG = {
    leftTabs: [
        {
            id: 'other',
            title: 'OTHER',
            component: Other,
        },
    ],
};

export default function EditorPage() {
    const [initialUrl, setInitialUrl] = React.useState<string>('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setInitialUrl(window.location.origin + '/?page=pc&id=1');
        }
    }, []);

    return (
        <ThemeProvider theme={'light'}>
            <div className={b()}>
                {initialUrl && (
                    <Editor
                        componentsConfig={COMPONENTS_CONFIG}
                        initialUrl={initialUrl}
                        disableUrlField={false}
                        onUpdate={() => {}}
                    />
                )}
            </div>
        </ThemeProvider>
    );
}
