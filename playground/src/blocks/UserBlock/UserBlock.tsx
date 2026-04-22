import * as React from 'react';
import {User} from '@gravity-ui/uikit';

export interface UserBlockProps {
    name?: string;
    description?: string;
    imgUrl?: string;
    size?: '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl';
}

const UserBlock: React.FC<UserBlockProps> = ({
    name = 'John Doe',
    description,
    imgUrl,
    size = 'm',
}) => {
    const avatar = imgUrl ? {imgUrl} : {text: name};

    return (
        <div style={{padding: '16px 24px'}}>
            <User name={name} description={description} avatar={avatar} size={size} />
        </div>
    );
};

export default UserBlock;
