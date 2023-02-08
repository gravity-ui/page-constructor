import React from 'react';

import {block} from '../../utils';
import {LayoutItemProps} from '../../models';
import {FullScreenMedia, Media, MetaInfo} from '../../components';
import {getLayoutItemLinks, hasFullScreen, showFullScreenIcon} from './utils';
import {Content} from '..';

import './LayoutItem.scss';

const b = block('layout-item');

const LayoutItem = ({
    content: {links, ...content},
    metaInfo,
    media,
    border,
    fullScreen,
    className,
}: LayoutItemProps) => (
    <div className={b(null, className)}>
        {fullScreen && hasFullScreen(media) ? (
            <FullScreenMedia showFullScreenIcon={showFullScreenIcon(media)}>
                {(fullScreenMediaProps = {}) => (
                    <Media {...media} {...fullScreenMediaProps} className={b('media', {border})} />
                )}
            </FullScreenMedia>
        ) : (
            <Media {...media} className={b('media', {border})} />
        )}
        {metaInfo && <MetaInfo items={metaInfo} className={b('meta-info')} />}
        <div className={b('content')}>
            <Content
                {...content}
                links={getLayoutItemLinks(links)}
                size="s"
                colSizes={{all: 12, md: 12}}
            />
        </div>
    </div>
);

export default LayoutItem;
