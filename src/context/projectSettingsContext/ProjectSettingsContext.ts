import * as React from 'react';

import {PlayButtonColors, PlayButtonProps} from '../../models';
import {ThemeSupporting} from '../../utils';

type DefaultVideoButtonSettings = Pick<PlayButtonProps, 'theme'> & {
    colors?: ThemeSupporting<PlayButtonColors>;
};

export interface ProjectSettingsContextProps {
    disableCompress?: boolean;
    isAnimationEnabled?: boolean;
    renderInvisibleBlocks?: boolean;
    defaultYandexFormTheme?: string;
    defaultVideoButtonSettings?: DefaultVideoButtonSettings;
}

export const ProjectSettingsContext = React.createContext<ProjectSettingsContextProps>({});
