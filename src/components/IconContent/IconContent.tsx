import React from 'react';

import {IconContentProps} from '../../models';
import {Content} from '../../sub-blocks';
import {block} from '../../utils';
import Image from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

import './IconContent.scss';

const b = block('icon-content');

const IconContent = (props: IconContentProps) => {
    const {icon, content} = props;
    if (!icon) {
        return <Content {...content} />;
    }

    const iconProps = getMediaImage(icon.value);
    const iconPosition = icon?.position;

    return (
        <div className={b({['icon-position']: iconPosition})}>
            {iconProps && (
                <Image {...iconProps} className={b('icon', {['icon-position']: iconPosition})} />
            )}
            <Content {...content} className={b({['content']: iconPosition})} />
        </div>
    );
};

export default IconContent;
