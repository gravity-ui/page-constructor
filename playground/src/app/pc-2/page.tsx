'use client';
import React from 'react';

import {PageConstructor, PageConstructorProvider} from '../../../../src';

import content from './content.json';
import navigation from './navigation.json';
import './styles.scss';

export default function Home() {
    return (
        <PageConstructorProvider projectSettings={{disableCompress: true}}>
            <PageConstructor content={content} navigation={navigation} />
        </PageConstructorProvider>
    );
}
