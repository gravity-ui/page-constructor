import React from 'react';

import {Col} from '../../../grid';
import {ImageDeviceProps, ImageObjectProps, TabsBlockItem, TabsBlockProps} from '../../../models';
import {Content} from '../../../sub-blocks';
import {block} from '../../../utils';

import './TabsTextContent.scss';

const b = block('tabs-block-text-content');

interface TextContentProps extends Pick<TabsBlockProps, 'centered' | 'contentSize'> {
    showMedia: boolean;
    isReverse: boolean;
    data?: TabsBlockItem;
    centered?: boolean;
    imageProps?: ImageObjectProps | ImageDeviceProps;
}

export const TabsTextContent = ({
    centered,
    contentSize = 's',
    showMedia,
    data,
    imageProps,
    isReverse,
}: TextContentProps) => {
    if (!data) {
        return null;
    }

    const {media, title, text, additionalInfo, link, links, buttons, list} = data;

    return (
        <Col sizes={{all: 12, md: showMedia ? 4 : 8}} className={b({centered: centered})}>
            <div
                className={b('wrapper', {
                    reverse: isReverse,
                    'no-image': !(media || imageProps),
                })}
            >
                <Content
                    title={title}
                    text={text}
                    additionalInfo={additionalInfo}
                    size={contentSize}
                    list={list}
                    links={[...(link ? [link] : []), ...(links || [])]}
                    buttons={buttons}
                    colSizes={{all: 12}}
                />
            </div>
        </Col>
    );
};

export default TabsTextContent;
