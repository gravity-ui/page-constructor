import * as React from 'react';

import {getMediaImage} from '../../../components/Media/Image/utils';
import type {ImageProps as ModelImageProps} from '../../../models';

export function useLogoImageProps(
    logoImage?: ModelImageProps | null,
): Record<string, unknown> | null {
    return React.useMemo(() => {
        if (!logoImage) {
            return null;
        }

        const resolved = getMediaImage(logoImage);
        if (typeof resolved === 'string') {
            return {src: resolved};
        }

        return resolved && typeof resolved === 'object'
            ? (resolved as unknown as Record<string, unknown>)
            : null;
    }, [logoImage]);
}
