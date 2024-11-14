import sanitize from 'sanitize-html';

import {MediaProps} from '../models';

export const mergeVideoMicrodata = (
    values: MediaProps = {},
    newValues: MediaProps['videoMicrodata'] = {},
): MediaProps => ({...values, videoMicrodata: {...newValues, ...(values.videoMicrodata || {})}});

export function sanitizeMicrodata(html: string) {
    return html && sanitize(html, {allowedTags: [], allowedAttributes: {}});
}
