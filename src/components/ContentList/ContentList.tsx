import React from 'react';

import {v4 as uuidv4} from 'uuid';

import {useTheme} from '../../context/theme';
import {ContentItemProps, ContentListProps, ContentSize, SVGIcon} from '../../models';
import {QAProps} from '../../models/common';
import {block, getThemedValue} from '../../utils';
import {getQaAttrubutes} from '../../utils/blocks';
import Image from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import './ContentList.scss';

const b = block('content-list');

function getHeadingLevel(size: ContentSize) {
    switch (size) {
        case 's':
            return 'h4';
        case 'l':
        default:
            return 'h3';
    }
}

function isIconSvg(icon: ContentItemProps['icon']): icon is SVGIcon {
    if (typeof icon === 'function') {
        return true;
    }
    return false;
}

const ContentList = ({list, size = 'l', qa}: ContentListProps & QAProps) => {
    const theme = useTheme();
    const qaAttributes = getQaAttrubutes(qa, ['image', 'title', 'text']);

    const renderIcon = (icon: ContentItemProps['icon']): JSX.Element => {
        const iconThemed = getThemedValue(icon, theme);
        if (isIconSvg(iconThemed)) {
            const Icon = iconThemed;
            return <div>{<Icon className={b('icon')} />}</div>;
        }
        const iconData = getMediaImage(iconThemed);
        return <Image {...iconData} className={b('icon')} qa={qaAttributes.image} />;
    };

    return (
        <div className={b({size})} data-qa={qa}>
            {list?.map((item) => {
                const {icon, title, text} = item;
                return (
                    <div className={b('item', {withoutTitle: !title})} key={uuidv4()}>
                        {renderIcon(icon)}
                        <div>
                            {title &&
                                React.createElement(
                                    getHeadingLevel(size),
                                    {className: b('title'), 'data-qa': qaAttributes.title},
                                    title,
                                )}
                            {text && (
                                <YFMWrapper
                                    className={b('text')}
                                    content={text}
                                    modifiers={{constructor: true}}
                                    qa={qaAttributes.text}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ContentList;
