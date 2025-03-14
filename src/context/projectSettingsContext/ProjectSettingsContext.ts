import * as React from 'react';
export interface ProjectSettingsContextProps {
    disableCompress?: boolean;
    isAnimationEnabled?: boolean;
    renderInvisibleBlocks?: boolean;
}

export const ProjectSettingsContext = React.createContext<ProjectSettingsContextProps>({});
