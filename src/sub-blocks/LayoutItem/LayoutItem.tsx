import React from 'react';

import {Content} from '..';
import {FullscreenMedia, Media, MetaInfo} from '../../components';
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
    fullscreen,
    className,
    analyticsEvents,
}: LayoutItemProps) => (
    <div className={b(null, className)}>
        {fullscreen && hasFullscreen(media) ? (
            <FullscreenMedia showFullscreenIcon={showFullscreenIcon(media)}>
                {({
                    className: mediaClassName,
                    fullscreen: _fullscreen,
                    ...fullscreenMediaProps
                } = {}) => (
                    <Media
                        {...media}
                        {...fullscreenMediaProps}
                        className={b('media', {border}, mediaClassName)}
                        analyticsEvents={analyticsEvents}
                    />
                )}
            </FullscreenMedia>
        ) : (
            <Media {...media} className={b('media', {border})} analyticsEvents={analyticsEvents} />
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
