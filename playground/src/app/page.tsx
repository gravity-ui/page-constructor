'use client';
import {ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import * as React from 'react';

import {Editor} from '../../../editor-v2';
import Source from '../../../editor-v2/containers/Source/Source';
import ViewSwitches from '../../../editor-v2/containers/ViewSwitches/ViewSwitches';

import './page.scss';

const b = block('home');

const Test = () => <div className={b('test')}>custom test</div>;

export const COMPONENTS_CONFIG = {
    middleTop: Test,
    leftTabs: [
        {
            id: 'test',
            title: 'TEST',
            component: Test,
        },
    ],
    rightTop: [Source, ViewSwitches],
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
