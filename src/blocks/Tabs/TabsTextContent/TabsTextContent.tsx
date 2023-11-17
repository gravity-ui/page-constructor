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
    data: TabsBlockItem;
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
}: TextContentProps) => (
    <Col sizes={{all: 12, md: showMedia ? 4 : 8}} className={b({centered: centered})}>
        <div
            className={b('wrapper', {
                'content-reverse': isReverse,
                'content-default': Boolean((data?.media || imageProps) && !isReverse),
            })}
        >
            <Content
                title={data.title}
                text={data.text}
                additionalInfo={data.additionalInfo}
                size={contentSize}
                links={[...(data.link ? [data.link] : []), ...(data.links || [])]}
                buttons={data.buttons}
                colSizes={{all: 12}}
            />
        </div>
    </Col>
);

export default TabsTextContent;
