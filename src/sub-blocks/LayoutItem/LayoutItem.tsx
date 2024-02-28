import React, {useMemo} from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {FullscreenMedia, IconWrapper, Media, MetaInfo} from '../../components';
import {ContentBlockProps, LayoutItemProps} from '../../models';
import {block} from '../../utils';
import renderContentControls from '../../utils/renderContentControls/renderContentControls';
import Content from '../Content/Content';

import {getLayoutItemLinks, hasFullscreen, showFullscreenIcon} from './utils';

import './LayoutItem.scss';

const b = block('layout-item');

const LayoutItem = ({
    content: {links, buttons, ...content},
    metaInfo,
    media,
    border,
    fullscreen,
    icon,
    className,
    analyticsEvents,
    controlPosition = 'content',
}: LayoutItemProps) => {
    const normalizedLinks = useMemo(() => getLayoutItemLinks(links), [links]);
    const areControlsInFooter = controlPosition === 'footer';

    const contentProps: ContentBlockProps = {
        ...content,
        ...(areControlsInFooter ? {} : {links: normalizedLinks, buttons}),
        size: 's',
        colSizes: {all: 12, md: 12},
    };
    const titleId = useUniqId();
    const footerControls = useMemo(
        () =>
            renderContentControls({
                links: areControlsInFooter ? links : undefined,
                buttons: areControlsInFooter ? buttons : undefined,
                size: 's',
                titleId,
            }),
        [areControlsInFooter, links, buttons, titleId],
    );
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
                    <Content {...contentProps} titleId={titleId} />
                </IconWrapper>
            </div>
            {footerControls}
        </div>
    );
};

export default LayoutItem;
