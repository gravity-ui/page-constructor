import React, {Children, Fragment, HTMLAttributeAnchorTarget, ReactElement} from 'react';

import {Link} from '@gravity-ui/uikit';

import {useAnalytics} from '../../hooks';
import {useMetrika} from '../../hooks/useMetrika';
import {
    AnalyticsEventsBase,
    ButtonPixel,
    CardBaseProps as CardBaseParams,
    DefaultEventNames,
    ImageProps,
    MetrikaGoal,
    WithChildren,
} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import RouterLink from '../RouterLink/RouterLink';

import './CardBase.scss';

export interface CardBaseProps extends AnalyticsEventsBase, CardBaseParams {
    className?: string;
    bodyClassName?: string;
    contentClassName?: string;
    children: ReactElement | ReactElement[];
    url?: string;
    urlTitle?: string;
    target?: HTMLAttributeAnchorTarget;
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: ButtonPixel;
    qa?: string;
    extraProps?: React.HTMLAttributes<HTMLElement>;
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
        metrikaGoals,
        pixelEvents,
        analyticsEvents,
        contentClassName,
        children,
        url,
        target,
        border = 'shadow',
        urlTitle,
        qa,
        extraProps = {},
    } = props;
    const handleMetrika = useMetrika();
    const handleAnalytics = useAnalytics(DefaultEventNames.CardBase, url);
    let header, content, footer, image, headerClass, footerClass;
    const qaAttributes = getQaAttrubutes(qa, 'header', 'footer', 'body', 'content');

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
                    qa={qaAttributes.header}
                >
                    <div className={b('header-content')}>{header}</div>
                </BackgroundImage>
            )}
            <div className={b('body', bodyClassName)} data-qa={qaAttributes.body}>
                <div className={b('content', contentClassName)} data-qa={qaAttributes.content}>
                    {content}
                </div>
                {footer && (
                    <div className={b('footer', footerClass)} data-qa={qaAttributes.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </Fragment>
    );

    const fullClassName = b({border}, className);

    const onClick = () => {
        handleMetrika({metrikaGoals, pixelEvents});
        handleAnalytics(analyticsEvents);
    };

    return url ? (
        <RouterLink href={url}>
            <Link
                href={url}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className={fullClassName}
                onClick={onClick}
                title={urlTitle}
                extraProps={{
                    draggable: false,
                    onDragStart: (e: React.DragEvent<HTMLAnchorElement>) => e.preventDefault(),
                    ...extraProps,
                }}
                qa={qa}
            >
                {cardContent}
            </Link>
        </RouterLink>
    ) : (
        <div className={fullClassName} data-qa={qa} {...extraProps}>
            {cardContent}
        </div>
    );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
