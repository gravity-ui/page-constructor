import React, {Children, ReactElement, Fragment, HTMLAttributeAnchorTarget} from 'react';

import {block} from '../../utils';
import {CardBaseProps as CardBaseParams, ImageProps} from '../../models';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import RouterLink from '../RouterLink/RouterLink';

import './CardBase.scss';

export interface CardBaseProps extends CardBaseParams {
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

interface LayoutParts {
    Header: React.FC<CardHeaderBaseProps>;
    Content: React.FC;
    Footer: React.FC<CardFooterBaseProps>;
}

const b = block('card-base-block');

const Header: React.FC<CardHeaderBaseProps> = () => null;
const Content: React.FC = () => null;
const Footer: React.FC<CardFooterBaseProps> = () => null;

export const Layout: React.FC<CardBaseProps> & LayoutParts = (props) => {
    const {
        className,
        bodyClassName,
        contentClassName,
        children,
        url,
        target,
        border = 'shadow',
        backgroundColor,
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

    const fullClassName = b({border: border}, className);

    return url ? (
        <RouterLink href={url}>
            <a
                href={url}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className={fullClassName}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
            >
                {cardContent}
            </a>
        </RouterLink>
    ) : (
        <div className={fullClassName} style={{backgroundColor}}>
            {cardContent}
        </div>
    );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
