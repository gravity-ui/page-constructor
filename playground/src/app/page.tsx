'use client';
import {ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import React, {useEffect, useState} from 'react';

import {Editor} from '../../../editor-v2';
import Source from '../../../editor-v2/containers/Source/Source';
import ViewSwitches from '../../../editor-v2/containers/ViewSwitches/ViewSwitches';

import './page.scss';

const b = block('home');

const Test = () => <div className={b('test')}>custom test</div>;

export default function Home() {
    const [initialUrl, setInitialUrl] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setInitialUrl(window.location.origin + '/pc');
        }
    }, []);

    return (
        <ThemeProvider theme={'light'}>
            <div className={b()}>
                {initialUrl && (
                    <Editor
                        componentsConfig={{
                            middleTop: Test,
                            leftTabs: [
                                {
                                    id: 'test',
                                    title: 'TEST',
                                    component: Test,
                                },
                            ],
                            rightTop: [Source, ViewSwitches],
                        }}
                        initialUrl={initialUrl}
                        disableUrlField={false}
                        onUpdate={() => {}}
                    />
                )}
            </div>
        </ThemeProvider>
    );
}
