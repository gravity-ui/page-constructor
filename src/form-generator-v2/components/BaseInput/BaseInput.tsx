import * as React from 'react';

import {Text} from '@gravity-ui/uikit';

import {formGeneratorCn} from '../../utils/cn';
import {ClassNameProps} from '../../../models/common';

import './BaseInput.scss';

const b = formGeneratorCn('base-input');

type BaseInputProps = ClassNameProps & {
    title: string;
    children: React.ReactNode;
};

const BaseInput = ({children, title, className}: BaseInputProps) => {
    return (
        <div className={b(null, className)}>
            <Text variant="body-1" className={b('title')}>
                {title}
            </Text>
            <div className={b('input')}>{children}</div>
        </div>
    );
};

export default BaseInput;
