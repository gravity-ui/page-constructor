import React from 'react';

import type {ImageBaseProps} from '../../components';

export type ImageContextProps = {
    Image?: React.ComponentType<ImageBaseProps>;
};

export const ImageContext = React.createContext<ImageContextProps>({});
