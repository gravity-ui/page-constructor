import * as React from 'react';
export interface ProjectSettingsContextProps {
    disableCompress?: boolean;
    isAnimationEnabled?: boolean;
    renderInvisibleBlocks?: boolean;
    yandexFormTheme?: string;
}

export const ProjectSettingsContext = React.createContext<ProjectSettingsContextProps>({});
