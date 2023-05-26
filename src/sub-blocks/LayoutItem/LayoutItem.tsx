import React from 'react';

import {Content} from '..';
import {FullScreenMedia, Media, MetaInfo} from '../../components';
import {LayoutItemProps} from '../../models';
import {block} from '../../utils';

import {getLayoutItemLinks, hasFullscreen, showFullscreenIcon} from './utils';

import './LayoutItem.scss';

const b = block('layout-item');

const LayoutItem = ({
    content: {links, ...content},
    metaInfo,
    media,
    border,
    fullScreen,
    fullscreen,
    className,
}: LayoutItemProps) => (
    <div className={b(null, className)}>
        {(fullScreen || fullscreen) && hasFullscreen(media) ? (
            <FullScreenMedia showFullscreenIcon={showFullscreenIcon(media)}>
                {({
                    className: mediaClassName,
                    fullScreen: _fullScreen,
                    ...fullscreenMediaProps
                } = {}) => (
                    <Media
                        {...media}
                        {...fullscreenMediaProps}
                        className={b('media', {border}, mediaClassName)}
                    />
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
