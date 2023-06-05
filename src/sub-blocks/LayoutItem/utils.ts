import {LayoutItemProps, LinkTheme, MediaProps} from '../../models';

export const getLayoutItemLinks = (links: LayoutItemProps['content']['links']) =>
    links?.map((link) => ({
        theme: 'normal' as LinkTheme,
        ...link,
    }));

export const hasFullscreen = ({dataLens, image}: MediaProps) => {
    // datalens and slider media card don't support fullscreen mode
    return !(dataLens || Array.isArray(image));
};

export const showFullscreenIcon = ({youtube}: MediaProps) => !youtube;
