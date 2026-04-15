import * as React from 'react';

import type {ImageBaseProps} from '../../components';

export type ImageContextProps = {
    Image?:
        | React.ComponentType<ImageBaseProps>
        | React.ForwardRefExoticComponent<ImageBaseProps & React.RefAttributes<HTMLImageElement>>;
};

export const ImageContext = React.createContext<ImageContextProps>({});
