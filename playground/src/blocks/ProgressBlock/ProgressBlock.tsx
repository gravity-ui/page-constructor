import * as React from 'react';
import {Progress} from '@gravity-ui/uikit';

export interface ProgressBlockProps {
    value?: string;
    text?: string;
    theme?: 'default' | 'success' | 'warning' | 'danger' | 'misc';
    size?: 'xs' | 's' | 'm';
}

const ProgressBlock: React.FC<ProgressBlockProps> = ({
    value = 50,
    text,
    theme = 'default',
    size = 'm',
}) => {
    return (
        <div style={{padding: '16px 24px'}}>
            <Progress value={Number(value)} text={text} theme={theme} size={size} />
        </div>
    );
};

export default ProgressBlock;
