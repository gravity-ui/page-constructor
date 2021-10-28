import React, {useCallback} from 'react';
import block from 'bem-cn-lite';
import {Platform, StoreBadge, Button as CommonButton, Icon} from '@yandex-data-ui/common';

import withLocale, {WithLocaleProps} from 'hoc/withLocale';
import metrika from 'counters/metrika';
import pixel from 'counters/pixel';
import {setUrlTld} from 'utils';
import {
    Metrika,
    ButtonPixel,
    ButtonProps as ButtonParams,
    isNewMetrikaFormat,
} from 'units/constructor/models';
import {OldButtonSize, OldButtonTheme, toCommonSize, toCommonView} from './utils';

import githubIcon from '@yandex-data-ui/common/assets/icons/social/github.svg';

import './Button.scss';

const b = block('button-block');
interface ButtonProps extends Omit<ButtonParams, 'url'>, WithLocaleProps {
    className?: string;
    url?: string;
    onClick?: () => void;
}

function trackButtonClick(metrikaGoals?: Metrika, pixelEvents?: ButtonPixel) {
    if (metrikaGoals) {
        if (isNewMetrikaFormat(metrikaGoals)) {
            metrikaGoals.forEach(({name, isCrossSite}) =>
                metrika.reachGoal(isCrossSite ? 'cross-site' : 'main', name),
            );
        } else {
            metrika.reachGoals(metrikaGoals);
        }
    }

    if (pixelEvents) {
        pixelEvents.forEach(({name, data}) => pixel.trackStandard(name, data));
    }
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const {
        className,
        metrikaGoals,
        pixelEvents,
        size = 'l',
        theme = 'normal',
        url,
        img,
        locale: {lang, tld},
        onClick: onClickOrigin,
        text,
        ...rest
    } = props;
    const defaultImgPosition = 'left';

    const onClick = useCallback(() => {
        trackButtonClick(metrikaGoals, pixelEvents);

        if (onClickOrigin) {
            onClickOrigin();
        }
    }, [onClickOrigin, metrikaGoals, pixelEvents]);

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

export default withLocale(Button);
