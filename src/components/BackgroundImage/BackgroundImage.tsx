import * as React from 'react';

import {BackgroundImageProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import Image from '../Image/Image';

import './BackgroundImage.scss';

export const qaIdByDefault = 'background-image';

const b = block('storage-background-image');

const BackgroundImage = (props: React.PropsWithChildren<BackgroundImageProps>) => {
    const {children, src, desktop, className, imageClassName, style, qa} = props;
    const qaAttributes = getQaAttrubutes(qa || qaIdByDefault);

    return (
        <div className={b(null, className)} style={style} data-qa={qa || qaIdByDefault}>
            {(src || desktop) && (
                <Image {...props} className={b('img', imageClassName)} qa={qaAttributes.image} />
            )}
            {children && <div className={b('container')}>{children}</div>}
        </div>
    );
};

export default BackgroundImage;
