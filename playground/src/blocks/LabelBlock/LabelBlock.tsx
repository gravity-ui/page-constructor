import * as React from 'react';

import {Label} from '@gravity-ui/uikit';

export interface LabelBlockProps {
    value?: string;
    theme?: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'utility' | 'unknown' | 'clear';
    size?: 'xs' | 's' | 'm';
}

const LabelBlock: React.FC<LabelBlockProps> = ({value = 'Label', theme = 'normal', size = 'm'}) => {
    return (
        <div style={{padding: '16px 24px'}}>
            <Label theme={theme} size={size}>
                {value}
            </Label>
        </div>
    );
};

export default LabelBlock;
