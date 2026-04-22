import * as React from 'react';
import {Alert} from '@gravity-ui/uikit';

export interface AlertBlockProps {
    title?: string;
    message?: string;
    theme?: 'normal' | 'info' | 'success' | 'warning' | 'danger' | 'utility' | 'clear';
    view?: 'filled' | 'outlined';
    corners?: 'rounded' | 'square';
    layout?: 'vertical' | 'horizontal';
}

const AlertBlock: React.FC<AlertBlockProps> = ({
    title,
    message = '',
    theme = 'normal',
    view = 'filled',
    corners = 'rounded',
    layout = 'horizontal',
}) => {
    return (
        <div style={{padding: '16px 24px'}}>
            <Alert
                theme={theme}
                title={title}
                message={message}
                view={view}
                corners={corners}
                layout={layout}
            />
        </div>
    );
};

export default AlertBlock;
