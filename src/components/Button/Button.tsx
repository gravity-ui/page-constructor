import React, {useCallback, useContext} from 'react';

import {StoreBadge} from '@gravity-ui/components';
import {Button as CommonButton, Icon, Platform} from '@gravity-ui/uikit';

import {LocaleContext} from '../../context/localeContext/localeContext';
import {useAnalytics} from '../../hooks';
import {Github} from '../../icons';
import {ButtonProps as ButtonParams, DefaultEventNames, QAProps} from '../../models';
import {block, setUrlTld} from '../../utils';

import {i18n} from './i18n';
import {ICON_QA, OldButtonSize, OldButtonTheme, toCommonSize, toCommonView} from './utils';

import './Button.scss';

export interface ButtonProps extends Omit<ButtonParams, 'url'>, QAProps {
    className?: string;
    url?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const b = block('button-block');

const Button = (props: ButtonProps) => {
    const {tld} = useContext(LocaleContext);
    const {
        className,
        analyticsEvents,
        size = 'l',
        theme = 'normal',
        url,
        urlTitle,
        img,
        onClick: onClickOrigin,
        text,
        width,
        ...rest
    } = props;
    const defaultImgPosition = 'left';
    const handleAnalytics = useAnalytics(DefaultEventNames.Button, url);
    const onClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            handleAnalytics(analyticsEvents);

            if (onClickOrigin) {
                onClickOrigin(e);
            }
        },
        [handleAnalytics, analyticsEvents, onClickOrigin],
    );

    const buttonModifiers = {size, theme, width};

    const buttonImg =
        img instanceof Object
            ? {url: img.url, position: img.position || defaultImgPosition, alt: img.alt}
            : {url: img, position: defaultImgPosition};

    const buttonClass = img
        ? b({position: buttonImg.position, ...buttonModifiers}, className)
        : b({...buttonModifiers}, className);

    const buttonProps = {
        ...rest,
        onClick,
    };

    if (theme === 'app-store' || theme === 'google-play') {
        const platform = theme === 'app-store' ? Platform.IOS : Platform.ANDROID;

        return <StoreBadge className={buttonClass} platform={platform} href={url} />;
    }

    let icon;
    let image = img && (
        <img className={b('image')} src={buttonImg.url} alt={buttonImg.alt || i18n('image-alt')} />
    );

    if (theme === 'github') {
        icon = <Icon className={b('icon')} data={Github} size={24} qa={ICON_QA} />;
        image = undefined;
    }

    const buttonTheme = theme === 'scale' ? 'accent' : theme;

    return (
        <CommonButton
            className={buttonClass}
            view={toCommonView(buttonTheme as OldButtonTheme)}
            size={toCommonSize(size as OldButtonSize)}
            href={url ? setUrlTld(url, tld) : undefined}
            title={urlTitle}
            width={width}
            {...buttonProps}
        >
            {icon && buttonImg.position === 'left' ? icon : null}
            <span className={b('content')}>
                {image && buttonImg.position === 'left' ? image : null}
                <span className={b('text')}>{text}</span>
                {image && buttonImg.position === 'right' ? image : null}
            </span>
            {icon && buttonImg.position === 'right' ? icon : null}
        </CommonButton>
    );
};

export default Button;
