import React from 'react';

import {FullscreenMedia, IconWrapper, Media, MetaInfo} from '../../components';
import {ContentBlockProps, LayoutItemProps} from '../../models';
import {block} from '../../utils';
import Content from '../Content/Content';

import {getLayoutItemLinks, hasFullscreen, showFullscreenIcon} from './utils';

import './LayoutItem.scss';

const b = block('layout-item');

const LayoutItem = ({
    content: {links, ...content},
    metaInfo,
    media,
    border,
    fullscreen,
    icon,
    className,
    analyticsEvents,
}: LayoutItemProps) => {
    const contentProps: ContentBlockProps = {
        ...content,
        links: getLayoutItemLinks(links),
        size: 's',
        colSizes: {all: 12, md: 12},
    };
    const renderMedia = () => {
        if (!media) {
            return null;
        }
        return fullscreen && hasFullscreen(media) ? (
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
        );
    };
    return (
        <div className={b(null, className)}>
            {renderMedia()}
            {metaInfo && <MetaInfo items={metaInfo} className={b('meta-info')} />}
            <div className={b('content', {'no-media': !media})}>
                <IconWrapper icon={icon}>
                    <Content {...contentProps} />
                </IconWrapper>
            </div>
        </div>
    );
};

export default LayoutItem;
