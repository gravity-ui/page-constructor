import * as React from 'react';

import {PlayButtonProps} from '../../models';

export interface ProjectSettingsContextProps {
    disableCompress?: boolean;
    isAnimationEnabled?: boolean;
    renderInvisibleBlocks?: boolean;
    defaultYandexFormTheme?: string;
    defaultVideoButtonSettings?: Pick<PlayButtonProps, 'theme' | 'colors'>;
}

export const ProjectSettingsContext = React.createContext<ProjectSettingsContextProps>({});
