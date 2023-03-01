import React from 'react';

import {ButtonProps} from '../../../../../models';
import {NavigationItemProps} from '../../NavigationItem';

import {block} from '../../../../../utils';

import {RouterLink, Button} from '../../../../../components';
import {BlockIdContext} from '../../../../../context/blockIdContext';

import './NavigationButton.scss';

const b = block('navigation-button');

const ANALYTICS_ID = 'navigation';

type NavigationButtonProps = Pick<NavigationItemProps, 'className'> & ButtonProps;

export const NavigationButton: React.FC<NavigationButtonProps> = (props) => {
    const {url, target, className} = props;
    const classes = b(null, className);
    return (
        <BlockIdContext.Provider value={ANALYTICS_ID}>
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
