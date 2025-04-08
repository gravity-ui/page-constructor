'use client';
import {ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import * as React from 'react';

import {Editor} from '../../../src/editor-v2';
import C9RComponent from './components/C9RComponent';

import './page.scss';

const b = block('home');

const Test = () => <div className={b('test')}>custom test</div>;

const COMPONENTS_CONFIG = {
    middleTop: Test,
    leftTop: [C9RComponent],
    leftTabs: [
        {
            id: 'test',
            title: 'TEST',
            component: Test,
        },
    ],
};

export default function Home() {
    const [initialUrl, setInitialUrl] = React.useState<string>('');

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            setInitialUrl(window.location.origin + '/pc');
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
