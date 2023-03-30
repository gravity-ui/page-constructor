// the file serves to support live video with react-player@2.9
const LIVE_YUOTUBE_VIDEO_REGEX =
    /(?:youtu\.be\/live\/|youtube(?:-nocookie)?\.com\/(?:live\/))((\w|-){11})/;
const YOUTUBE_VIDEO_TEMPLATE = 'https://www.youtube.com/watch?v=';

const transformYoutubeUrl = (src: string) => {
    if (LIVE_YUOTUBE_VIDEO_REGEX.test(src)) {
        const youtubeLiveId = src.match(LIVE_YUOTUBE_VIDEO_REGEX)?.[1];
        if (!youtubeLiveId) {
            return src;
        }

        return `${YOUTUBE_VIDEO_TEMPLATE}${youtubeLiveId}`;
    }

    return src;
};

export const checkYoutubeVideos = (src: string | string[]) => {
    if (Array.isArray(src)) {
        return src.map((videoUrl) => transformYoutubeUrl(videoUrl));
    }

    return transformYoutubeUrl(src);
};
