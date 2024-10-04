import React from 'react';

import {Button, RouterLink} from '../../../../../components';
import {BlockIdContext} from '../../../../../context/blockIdContext';
import {ButtonProps} from '../../../../../models';
import {block} from '../../../../../utils';
import {NavigationItemProps} from '../../../../models';

import './NavigationButton.scss';

const b = block('navigation-button');

const ANALYTICS_ID = 'navigation';

type NavigationButtonProps = Pick<NavigationItemProps, 'className'> & ButtonProps;

export const NavigationButton: React.FC<NavigationButtonProps> = (props) => {
    const {url, target, className} = props;
    const classes = b(null, className);
    return (
        // TODO: fix any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <BlockIdContext.Provider value={ANALYTICS_ID as any}>
            {target ? (
                <Button className={classes} {...props} url={url} />
            ) : (
                <RouterLink href={url}>
                    <Button {...props} className={classes} url={url} />
                </RouterLink>
            )}
        </BlockIdContext.Provider>
    );
};
