import * as React from 'react';

import {PlayFill} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {useTheme} from '../../context/theme';
import {PlayButtonColors, PlayButtonProps, PlayButtonThemes, PlayButtonType} from '../../models';
import {block, getThemedValue} from '../../utils';
import {i18n} from '../ReactPlayer/i18n';

import './VideoButton.scss';

export interface VideoButtonProps extends PlayButtonProps {
    customButton?: React.ReactNode;
    ref?: React.LegacyRef<HTMLButtonElement>;
    id?: string;
}

const b = block('video-button');

const VideoButton = ({
    customButton,
    text,
    type,
    theme: initialTheme,
    className,
    ref,
    id,
}: VideoButtonProps) => {
    const {defaultVideoButtonSettings} = React.useContext(ProjectSettingsContext);
    const currentTheme = useTheme();

    const playButtonContent = React.useMemo(() => {
        switch (type) {
            case PlayButtonType.Text:
                return text;
            case PlayButtonType.Default:
            default:
                return <Icon className={b('icon')} data={PlayFill} size={24} />;
        }
    }, [text, type]);

    const theme = initialTheme || defaultVideoButtonSettings?.theme || PlayButtonThemes.Blue;

    const style = React.useMemo(() => {
        if (theme !== PlayButtonThemes.Custom) {
            return undefined;
        }

        const themedColors = defaultVideoButtonSettings?.colors
            ? getThemedValue(defaultVideoButtonSettings.colors, currentTheme)
            : undefined;

        const resolveColor = (colorName: keyof PlayButtonColors) => {
            return themedColors?.[colorName];
        };

        return {
            '--pc-video-button-circle-color': resolveColor('circleColor'),
            '--pc-video-button-circle-hover-color': resolveColor('circleHoverColor'),
            '--pc-video-button-triangle-color': resolveColor('triangleColor'),
            '--pc-video-button-triangle-hover-color': resolveColor('triangleHoverColor'),
        } as React.CSSProperties;
    }, [currentTheme, defaultVideoButtonSettings?.colors, theme]);

    if (customButton) {
        return customButton;
    }

    return (
        <button
            className={b({theme, text: Boolean(text)}, className)}
            aria-label={i18n('play')}
            ref={ref}
            id={id}
            style={style}
        >
            {playButtonContent}
        </button>
    );
};

export default VideoButton;
