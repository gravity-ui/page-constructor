import React from 'react';

import {ButtonProps} from '../../../../models';

import {RouterLink, Button} from '../../../../components';

export const NavigationButton: React.FC<ButtonProps> = (props) => {
    const {url, target} = props;

    return target ? (
        <Button {...props} url={url} />
    ) : (
        <RouterLink href={url}>
            <Button {...props} url={url} />
        </RouterLink>
    );
};
