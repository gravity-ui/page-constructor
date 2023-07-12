import React, {Fragment, ReactNode, useContext} from 'react';

import {HTML, ToggleArrow} from '../';
import {LocationContext} from '../../context/locationContext';
import {MobileContext} from '../../context/mobileContext';
import {TextSize, TitleItemProps} from '../../models';
import {block, getHeaderTag, getLinkProps} from '../../utils';
import Anchor from '../Anchor/Anchor';

import './TitleItem.scss';

const b = block('title-item');

export function getArrowSize(size: TextSize, isMobile: boolean) {
    switch (size) {
        case 'xs':
            return 13;
        case 's':
            return 16;
        case 'm':
            return isMobile ? 22 : 24;
        case 'l':
            return isMobile ? 26 : 38;
        default:
            return 20;
    }
}

export interface TitleItemFullProps extends TitleItemProps {
    className?: string;
    onClick?: () => void;
    dataQa?: string;
    resetMargin?: boolean;
}

const TitleItem = (props: TitleItemFullProps) => {
    const isMobile = useContext(MobileContext);

    const {
        textSize = 'm',
        text,
        anchor,
        justify,
        url,
        onClick,
        custom,
        className,
        dataQa,
        resetMargin = true,
    } = props;

    const {hostname} = useContext(LocationContext);
    const textMarkup = (
        <React.Fragment>
            <HTML className={b('text')}>{text}</HTML>
            {custom && (
                <React.Fragment>
                    &nbsp;
                    <span className={b('custom')}>{custom}</span>
                </React.Fragment>
            )}
        </React.Fragment>
    );
    let content: ReactNode;

    const insideClickableContent = (
        <span className={b('wrapper')}>
            {textMarkup}
            &nbsp;
            <ToggleArrow
                className={b('arrow', {size: textSize})}
                size={getArrowSize(textSize, isMobile)}
                type={'horizontal'}
                iconType="navigation"
                open={false}
            />
        </span>
    );

    if (!url && !onClick) {
        content = textMarkup;
    } else if (url) {
        content = (
            <a className={b('link')} href={url} {...getLinkProps(url, hostname)} onClick={onClick}>
                {insideClickableContent}
            </a>
        );
    } else if (onClick) {
        content = (
            <span className={b('link')} onClick={onClick}>
                {insideClickableContent}
            </span>
        );
    }

    return (
        <Fragment>
            {anchor && <Anchor id={anchor} className={b('anchor')} />}
            {React.createElement(
                getHeaderTag(textSize),
                {
                    className: b({size: textSize, justify, 'reset-margin': resetMargin}, className),
                    'data-qa': `${dataQa}-header`,
                },
                content,
            )}
        </Fragment>
    );
};

export default TitleItem;
