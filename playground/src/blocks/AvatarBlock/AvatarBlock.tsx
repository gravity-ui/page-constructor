import * as React from 'react';
import {Avatar} from '@gravity-ui/uikit';
import type {AvatarSize} from '@gravity-ui/uikit';

export interface AvatarBlockProps {
    text?: string;
    imgUrl?: string;
    size?: AvatarSize;
    theme?: 'normal' | 'brand';
    view?: 'filled' | 'outlined';
}

const AvatarBlock: React.FC<AvatarBlockProps> = ({
    text = 'AB',
    imgUrl,
    size = 'xl',
    theme = 'normal',
    view = 'filled',
}) => {
    const avatarProps = imgUrl
        ? {imgUrl, text, size, theme, view}
        : {text, size, theme, view};

    return (
        <div style={{padding: '16px 24px'}}>
            <Avatar {...avatarProps} />
        </div>
    );
};

export default AvatarBlock;
