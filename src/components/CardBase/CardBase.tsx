import React, {Children, ReactElement, Fragment, HTMLAttributeAnchorTarget} from 'react';

import {block} from '../../utils';
import {
    CardBaseProps as CardBaseParams,
    ImageProps,
    WithChildren,
    AnalyticsEventsBase,
    DeprecatedAnalytics,
} from '../../models';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

import CardLinkWrapper from '../CardLinkWrapper/CardLinkWrapper';

import './CardBase.scss';

export interface CardBaseProps extends CardBaseParams, DeprecatedAnalytics, AnalyticsEventsBase {
    className?: string;
    bodyClassName?: string;
    contentClassName?: string;
    children: ReactElement | ReactElement[];
    url?: string;
    target?: HTMLAttributeAnchorTarget;
}

export interface CardHeaderBaseProps {
    className?: string;
    image?: ImageProps | null;
}

export interface CardFooterBaseProps {
    className?: string;
}

const b = block('card-base-block');

const Header: React.FC<WithChildren<CardHeaderBaseProps>> = () => null;
const Content: React.FC<WithChildren<{}>> = () => null;
const Footer: React.FC<WithChildren<CardFooterBaseProps>> = () => null;

export const Layout = (props: CardBaseProps) => {
    const {
        className,
        bodyClassName,
        contentClassName,
        children,
        url,
        target,
        border = 'shadow',
        ...analytics
    } = props;
    let header, content, footer, image, headerClass, footerClass;

    function handleChild(child: ReactElement) {
        switch (child.type) {
            case Header:
                header = child.props.children;
                image = child.props.image;
                headerClass = child.props.className;
                break;
            case Content:
                content = child.props.children;
                break;
            case Footer:
                footer = child.props.children;
                footerClass = child.props.className;
                break;
        }
    }

    if (Children.count(children) === 1) {
        handleChild(children as ReactElement);
    } else {
        Children.forEach(children, handleChild);
    }

    const cardContent = (
        <Fragment>
            {(header || image) && (
                <BackgroundImage
                    className={b('header', headerClass)}
                    {...(typeof image === 'string' ? {src: image} : image)}
                >
                    <div className={b('header-content')}>{header}</div>
                </BackgroundImage>
            )}
            <div className={b('body', bodyClassName)}>
                <div className={b('content', contentClassName)}>{content}</div>
                {footer && <div className={b('footer', footerClass)}>{footer}</div>}
            </div>
        </Fragment>
    );

    const fullClassName = b({border}, className);

    return url ? (
        <CardLinkWrapper url={url} target={target} className={fullClassName} {...analytics}>
            {cardContent}
        </CardLinkWrapper>
    ) : (
        <div className={fullClassName}>{cardContent}</div>
    );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
