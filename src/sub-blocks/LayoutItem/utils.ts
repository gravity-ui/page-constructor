import {LayoutItemProps, LinkTheme, MediaProps} from '../../models';

export const getLayoutItemLinks = (links: LayoutItemProps['content']['links']) =>
    links?.map((link) => ({
        theme: 'normal' as LinkTheme,
        ...link,
    }));

export const hasFullScreen = ({dataLens, image}: MediaProps) => {
    // datalens and slider media card don't support fullscrPcareen
    return !(dataLens || Array.isArray(image));
};

export const showFullScreenIcon = ({youtube}: MediaProps) => !youtube;
