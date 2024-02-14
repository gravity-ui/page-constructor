import {YouTubePlayer} from 'youtube-player/dist/types';

export const isYoutubePlayerInstance = (
    playerInstance: Record<string, unknown> | YouTubePlayer,
): playerInstance is YouTubePlayer => {
    return Boolean(playerInstance['pauseVideo'] && playerInstance['playVideo']);
};
