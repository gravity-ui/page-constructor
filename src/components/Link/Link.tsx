import * as React from 'react';

import {ChevronRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {LocaleContext} from '../../context/localeContext';
import {LocationContext} from '../../context/locationContext';
import {useAnalytics} from '../../hooks';
import {
    ClassNameProps,
    DefaultEventNames,
    LinkProps,
    LinkTheme,
    Tabbable,
    TextSize,
} from '../../models';
import {QAProps} from '../../models/common';
import {block, getLinkProps, getQaAttrubutes, setUrlTld} from '../../utils';
import BackLink from '../BackLink/BackLink';
import FileLink from '../FileLink/FileLink';

import './Link.scss';

const b = block('link-block');
const WORD_JOINER_SYM = '\u200b';

export type LinkFullProps = LinkProps & ClassNameProps & Tabbable & QAProps;

function getArrowSize(size: TextSize) {
    switch (size) {
        case 'l':
            return 20;
        case 'm':
        case 'sm':
            return 18;
        case 's':
            return 14;
        default:
            return 14;
    }
}

function getTextSize({size, theme}: {size?: TextSize; theme: LinkTheme}) {
    if (!size) {
        return theme === 'back' ? 'l' : 'm';
    }

    if (size === 'sm') {
        return 'm';
    }

    return size;
}

const Link = (props: React.PropsWithChildren<LinkFullProps>) => {
    const {
        text,
        url,
        arrow,
        analyticsEvents,
        theme = 'file-link',
        colorTheme = 'light',
        textSize = 'm',
        className,
        target,
        children,
        tabIndex,
        qa,
        urlTitle,
        extraProps,
    } = props;
    const qaAttributes = getQaAttrubutes(qa, ['normal']);

    const handleAnalytics = useAnalytics(DefaultEventNames.Link, url);
    const {hostname} = React.useContext(LocationContext);
    const {tld} = React.useContext(LocaleContext);
    const href = setUrlTld(props.url, tld);

    const onClick = () => {
        handleAnalytics(analyticsEvents);
    };

    const getLinkByType = () => {
        switch (theme) {
            case 'back':
                return (
                    <BackLink
                        title={children || text}
                        url={href}
                        onClick={onClick}
                        tabIndex={tabIndex}
                        extraProps={extraProps}
                    />
                );
            case 'file-link':
            case 'underline':
                return (
                    <FileLink
                        text={children || text}
                        href={href}
                        type="horizontal"
                        textSize={textSize}
                        onClick={onClick}
                        tabIndex={tabIndex}
                        extraProps={extraProps}
                    />
                );
            case 'normal': {
                const linkProps = getLinkProps(url, hostname, target);
                const content = children || text;

                return (
                    <a
                        className={b('link', {theme: colorTheme, 'has-arrow': arrow})}
                        href={href}
                        onClick={onClick}
                        tabIndex={tabIndex}
                        title={urlTitle}
                        {...linkProps}
                        data-qa={qaAttributes.normal}
                        {...extraProps}
                    >
                        {arrow ? (
                            <React.Fragment>
                                <span className={b('content')}>{content}</span>
                                {WORD_JOINER_SYM}
                                <Icon
                                    className={b('arrow')}
                                    data={ChevronRight}
                                    size={getArrowSize(textSize)}
                                />
                            </React.Fragment>
                        ) : (
                            content
                        )}
                    </a>
                );
            }
            default:
                return null;
        }
    };
    return (
        <div className={b({size: getTextSize({size: textSize, theme})}, className)}>
            {getLinkByType()}
        </div>
    );
};

export default Link;
