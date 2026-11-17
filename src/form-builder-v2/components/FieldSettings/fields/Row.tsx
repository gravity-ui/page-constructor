import * as React from 'react';

import {formBuilderV2Cn} from '../../../utils/cn';

const b = formBuilderV2Cn('field-settings');

interface RowProps {
    label: string;
    children: React.ReactNode;
    fullWidth?: boolean;
}

export const Row = ({label, children, fullWidth}: RowProps) => (
    <div className={b('row', {'full-width': fullWidth})}>
        <span className={b('row-label')}>{label}</span>
        <div>{children}</div>
    </div>
);
