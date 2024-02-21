import React, {Fragment, useMemo} from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {Buttons, FullscreenMedia, IconWrapper, Links, Media, MetaInfo} from '../../components';
import {ContentBlockProps, LayoutItemProps} from '../../models';
import {block} from '../../utils';
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
            {areControlsInFooter && (links || buttons) && (
                <Fragment>
                    <Links
                        className={b('links')}
                        links={normalizedLinks}
                        size="s"
                        titleId={titleId}
                    />
                    <Buttons
                        className={b('buttons')}
                        buttons={buttons}
                        size="s"
                        titleId={titleId}
                    />
                </Fragment>
            )}
        </div>
    );
};

export default LayoutItem;
