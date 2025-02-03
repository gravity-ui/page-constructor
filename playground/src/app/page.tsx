'use client';
import {ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import React, {useEffect, useState} from 'react';

import {Editor} from '../../../src/editor-v2';

import './page.scss';

const b = block('home');

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
                    <Editor initialUrl={initialUrl} disableUrlField={false} onUpdate={() => {}} />
                )}
            </div>
        </ThemeProvider>
    );
}
