import React from 'react';

import {ImageBaseProps} from '../../components';

export type Image = React.ComponentClass<ImageBaseProps> | React.FC<ImageBaseProps>;

export type ImageContextProps = {
    Image?: Image;
};

export const ImageContext = React.createContext<ImageContextProps>({});
