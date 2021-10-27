import React, {Fragment, ReactNode} from 'react';
import block from 'bem-cn-lite';
import {HTML} from '@doc-tools/components';

import {TextSize, TitleProps} from '../../models';
import {getHeaderTag} from '../../utils';
import Anchor from '../Anchor/Anchor';
import ToggleArrow from '../ToggleArrow/ToggleArrow';
import {getLinkProps} from 'utils';
import withRouter, {WithRouterProps} from 'hoc/withRouter';

import './Title.scss';

const b = block('title-block');

export function getArrowSize(size: TextSize) {
    switch (size) {
        case 'l':
            return 24;
        case 's':
            return 14;
        case 'm':
        default:
            return 20;
    }
}

export interface TitleFullProps extends TitleProps, WithRouterProps {
    className?: string;
    onClick?: () => void;
    dataQa?: string;
}

const Title: React.FunctionComponent<TitleFullProps> = (props) => {
    const {
        textSize = 'm',
        text,
        anchor,
        justify,
        url,
        router,
        onClick,
        custom,
        className,
        dataQa,
    } = props;
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
                size={getArrowSize(textSize)}
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
            <a className={b('link')} href={url} {...getLinkProps(url, router)} onClick={onClick}>
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
                    className: b({size: textSize, justify}, className),
                    'data-qa': `${dataQa}-header`,
                },
                content,
            )}
        </Fragment>
    );
};

export default withRouter(Title);
