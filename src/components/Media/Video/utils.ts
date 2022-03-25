export enum VideoExt {
    Mp4 = 'mp4',
    Webm = 'webm',
    Ogg = 'ogg',
    Ogv = 'ogv',
}

export enum VideoType {
    Mp4 = 'video/mp4',
    Webm = 'video/webm',
    Ogg = 'video/ogg',
}

export interface ParsedVideo {
    src: string;
    type: VideoType | undefined;
}

const VideoTypePriority = {
    [VideoType.Webm]: 1,
    [VideoType.Ogg]: 2,
    [VideoType.Mp4]: 3,
};

function parseVideoType(src: string): VideoType | undefined {
    const [path] = src.split('?');
    const fileExt = path.split('.').pop() as VideoExt;

    switch (fileExt) {
        case VideoExt.Mp4:
            return VideoType.Mp4;
        case VideoExt.Webm:
            return VideoType.Webm;
        case VideoExt.Ogg:
        case VideoExt.Ogv:
            return VideoType.Ogg;
        default:
            return undefined;
    }
}

export const getVideoTypesWithPriority = (sources: string[]): ParsedVideo[] =>
    sources
        .map((src) => ({src, type: parseVideoType(src)}))
        .sort(({type: typeA}, {type: typeB}) => {
            if (typeA === undefined) {
                return 1;
            }
            if (typeB === undefined) {
                return -1;
            }
            return VideoTypePriority[typeA] - VideoTypePriority[typeB];
        });
