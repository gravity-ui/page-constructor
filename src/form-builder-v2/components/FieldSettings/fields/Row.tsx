import * as React from 'react';

import {formBuilderV2Cn} from '../../../utils/cn';

const b = formBuilderV2Cn('field-settings');

interface RowProps {
    label: string;
    children: React.ReactNode;
}

export const Row = ({label, children}: RowProps) => (
    <div className={b('row')}>
        <span className={b('row-label')}>{label}</span>
        <div>{children}</div>
    </div>
);
