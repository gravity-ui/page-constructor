import * as React from 'react';
import {Button} from '@gravity-ui/uikit';

export interface ButtonBlockProps {
    text?: string;
    view?: 'normal' | 'action' | 'outlined' | 'flat' | 'raised';
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    href?: string;
    target?: '_blank' | '_self';
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({
    text = 'Button',
    view = 'action',
    size = 'm',
    href,
    target = '_self',
}) => {
    return (
        <div style={{padding: '16px 24px'}}>
            <Button view={view} size={size} href={href} target={target}>
                {text}
            </Button>
        </div>
    );
};

export default ButtonBlock;
