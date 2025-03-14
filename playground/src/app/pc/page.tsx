'use client';

import {PageConstructor, PageConstructorProvider} from '../../../../src';

import content from './content.json';

export default function Home() {
    return (
        <PageConstructorProvider projectSettings={{disableCompress: true}}>
            <PageConstructor content={content} />
        </PageConstructorProvider>
    );
}
