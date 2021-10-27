import React from 'react';
import block from 'bem-cn-lite';

import i18n from './i18n';

import './HelloWorld.scss';

export interface HelloWorldProps {
    className?: string;
}

const b = block('pc-hello-world');

export function HelloWorld({className}: HelloWorldProps) {
    return <span className={b(null, className)}>{i18n('text')}</span>;
}
