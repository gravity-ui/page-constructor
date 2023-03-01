import React, {ReactElement} from 'react';

import {useMetrika} from '../../hooks/useMetrika';
import {DefaultEventNames} from '../../models/common';
import {useAnalytics} from '../../hooks';
import {block} from '../../utils';
import {CardLinkProps} from '../../models';
import RouterLink from '../RouterLink/RouterLink';

import './CardLinkWrapper.scss';

export interface CardLinkWrapperProps extends CardLinkProps {
    className?: string;
    onClick?: () => void;
    children: ReactElement | ReactElement[];
}

const b = block('card-link-wrapper');

export const CardLinkWrapper = ({
    url,
    target,
    children,
    pixelEvents,
    metrikaGoals,
    className,
    analyticsEvents,
    onClick,
}: CardLinkWrapperProps) => {
    const handleMetrika = useMetrika();
    const handleAnalytics = useAnalytics(DefaultEventNames.CardBase, url);
    
    const clickHandler = () => {
        handleMetrika({metrikaGoals, pixelEvents});
        handleAnalytics(analyticsEvents);

        if (onClick) {
            onClick();
        }
    };

    return (
        <RouterLink href={url}>
            <a
                href={url}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={clickHandler}
                className={b(null, className)}
            >
                {children}
            </a>
        </RouterLink>
    );
};

export default CardLinkWrapper;
