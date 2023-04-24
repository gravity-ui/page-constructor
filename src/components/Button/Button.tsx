import React, {useCallback, useContext} from 'react';

import {Button as CommonButton, Icon, Platform, StoreBadge} from '@gravity-ui/uikit';

import {LocaleContext} from '../../context/localeContext/localeContext';
import {useAnalytics} from '../../hooks';
import {useMetrika} from '../../hooks/useMetrika';
import {Github} from '../../icons';
import {ButtonProps as ButtonParams, DefaultEventNames} from '../../models';
import {block, setUrlTld} from '../../utils';
import ImageBase from '../ImageBase/ImageBase';
import {ICON_QA, OldButtonSize, OldButtonTheme, toCommonSize, toCommonView} from './utils';

import './Button.scss';

export interface ButtonProps extends Omit<ButtonParams, 'url'> {
    className?: string;
    url?: string;
    onClick?: () => void;
    qa?: string;
}

const b = block('button-block');

const Button = (props: ButtonProps) => {
    const handleMetrika = useMetrika();
    const {lang, tld} = useContext(LocaleContext);
    const {
        className,
        metrikaGoals,
        pixelEvents,
        analyticsEvents,
        size = 'l',
        theme = 'normal',
        url,
        img,
        onClick: onClickOrigin,
        text,
        ...rest
    } = props;
    const defaultImgPosition = 'left';
    const handleAnalytics = useAnalytics(DefaultEventNames.Button, url);
    const onClick = useCallback(() => {
        handleMetrika({metrikaGoals, pixelEvents});
        handleAnalytics(analyticsEvents);

        if (onClickOrigin) {
            onClickOrigin();
        }
    }, [handleMetrika, metrikaGoals, pixelEvents, handleAnalytics, analyticsEvents, onClickOrigin]);

    const buttonImg =
        img instanceof Object
            ? {url: img.url, position: img.position || defaultImgPosition, alt: img.alt}
            : {url: img, position: defaultImgPosition};

    const buttonClass = img
        ? b({position: buttonImg.position, size, theme}, className)
        : b({size, theme}, className);

    const buttonProps = {
        ...rest,
        onClick,
    };

    if (theme === 'app-store' || theme === 'google-play') {
        const platform = theme === 'app-store' ? Platform.IOS : Platform.ANDROID;

        return <StoreBadge className={buttonClass} platform={platform} lang={lang} url={url} />;
    }

    let icon;
    let image = img && (
        <ImageBase
            className={b('image')}
            src={buttonImg.url}
            alt={buttonImg.alt || 'Button image'}
        />
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
