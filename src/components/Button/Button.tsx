import React, {useCallback, useContext} from 'react';
import {Platform, Button as CommonButton, Icon} from '@yandex-cloud/uikit';
import {StoreBadge} from '@yandex-data-ui/common';
import githubIcon from '@yandex-data-ui/common/assets/icons/social/github.svg';

import {block, setUrlTld} from '../../utils';
import {ButtonProps as ButtonParams} from '../../models';
import {OldButtonSize, OldButtonTheme, toCommonSize, toCommonView} from './utils';
import {LocaleContext} from '../../context/localeContext/localeContext';
import {useMetrika} from '../../hooks/useMetrika';

import './Button.scss';

export interface ButtonProps extends Omit<ButtonParams, 'url'> {
    className?: string;
    url?: string;
    onClick?: () => void;
}

const b = block('button-block');

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const handleMetrika = useMetrika();
    const {lang, tld} = useContext(LocaleContext);
    const {
        className,
        metrikaGoals,
        pixelEvents,
        size = 'l',
        theme = 'normal',
        url,
        img,
        onClick: onClickOrigin,
        text,
        ...rest
    } = props;
    const defaultImgPosition = 'left';

    const onClick = useCallback(() => {
        handleMetrika({metrikaGoals, pixelEvents});

        if (onClickOrigin) {
            onClickOrigin();
        }
    }, [handleMetrika, metrikaGoals, pixelEvents, onClickOrigin]);

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
    let image = img && <img className={b('image')} src={buttonImg.url} alt={buttonImg.alt} />;

    if (theme === 'github') {
        icon = <Icon className={b('icon')} data={githubIcon} size={24} />;
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
