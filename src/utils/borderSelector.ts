// This is a crutch
// The crutch is created in order to help us to work with sites, which use
// "disableShadow" flag in their content.
// We have deprecated the flag.
// We have to remove it after deleting of "disableShadow" and migration of projects content

import {MediaBorder} from '../models';

type GetMediaBorderArgs = {
    border?: MediaBorder;
    disableShadow?: boolean;
};

export const getMediaBorder = ({border, disableShadow}: GetMediaBorderArgs) => {
    if (border) {
        return border;
    }

    if (disableShadow) {
        return 'none' as MediaBorder;
    }

    return 'shadow' as MediaBorder;
};
