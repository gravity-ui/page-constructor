import React from 'react';

import {Button} from '../../../../../components';
import {BlockIdContext} from '../../../../../context/blockIdContext';
import {ButtonProps} from '../../../../../models';
import {block} from '../../../../../utils';
import {NavigationItemProps} from '../../NavigationItem';

import './NavigationButton.scss';

const b = block('navigation-button');

const ANALYTICS_ID = 'navigation';

type NavigationButtonProps = Pick<NavigationItemProps, 'className'> & ButtonProps;

export const NavigationButton: React.FC<NavigationButtonProps> = (props) => {
    const {url, className} = props;
    const classes = b(null, className);
    return (
        <BlockIdContext.Provider value={ANALYTICS_ID}>
            <Button {...props} className={classes} url={url} />
        </BlockIdContext.Provider>
    );
};
