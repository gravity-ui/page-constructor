import {MediaProps} from '../models';

export const mergeVideoMicrodata = (
    values: MediaProps = {},
    newValues: MediaProps['videoMicrodata'] = {},
): MediaProps => ({...values, videoMicrodata: {...newValues, ...(values.videoMicrodata || {})}});
