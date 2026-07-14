import * as React from 'react';

import {PlayFill} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {PlayButtonProps, PlayButtonThemes, PlayButtonType} from '../../models';
import {block} from '../../utils';
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
    colors,
}: VideoButtonProps) => {
    const {defaultVideoButtonSettings} = React.useContext(ProjectSettingsContext);

    const playButtonContent = React.useMemo(() => {
        switch (type) {
            case PlayButtonType.Text:
                return text;
            case PlayButtonType.Default:
            default:
                return <Icon className={b('icon')} data={PlayFill} size={24} />;
        }
    }, [text, type]);

    const style = React.useMemo(
        () => defaultVideoButtonSettings?.colors || colors,
        [colors, defaultVideoButtonSettings?.colors],
    );
    const theme = initialTheme || defaultVideoButtonSettings?.theme || PlayButtonThemes.Blue;

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
