import React from 'react';

import i18n from './i18n';
import {block} from '../../utils/cn';
import {ClassNameProps} from '../types';

const b = block('hello-world');

export const HelloWorld: React.FC<ClassNameProps> = ({className}) => {
    return <div className={b(null, className)}>{i18n('text')}</div>;
};

HelloWorld.displayName = 'HelloWorld';
