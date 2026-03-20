import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import {formGeneratorCn} from '../../utils/cn';
import './BaseInput.scss';

const b = formGeneratorCn('base-input');

const BaseInput = ({children, title}) => {
    return (
        <div className={b()}>
            <Text variant="body-1" className={b('title')}>{title}</Text>
            <div className={b('input')}>{children}</div>
        </div>
    );
};

export default BaseInput;
