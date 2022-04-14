import React from 'react';
export interface ProjectSettingsContextProps {
    disableCompress?: boolean;
}

export const ProjectSettingsContext = React.createContext<ProjectSettingsContextProps>({});
