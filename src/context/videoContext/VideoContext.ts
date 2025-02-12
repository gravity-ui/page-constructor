import * as React from 'react';

export interface VideoContextProps {
    setProps: (newValues: Record<string, unknown>) => void;
    playingVideoRef?: HTMLDivElement;
}

export const VideoContext = React.createContext<VideoContextProps>({setProps: () => {}});
