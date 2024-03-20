import React, {useMemo} from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {Buttons, FullscreenMedia, IconWrapper, Links, Media, MetaInfo} from '../../components';
import {useTheme} from '../../context/theme';
import {ContentBlockProps, LayoutItemProps} from '../../models';
import {block, getThemedValue} from '../../utils';
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
    const theme = useTheme();

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
        const themedMedia = getThemedValue(media, theme);

        return fullscreen && hasFullscreen(themedMedia) ? (
            <FullscreenMedia showFullscreenIcon={showFullscreenIcon(themedMedia)}>
                {({
                    className: mediaClassName,
                    fullscreen: _fullscreen,
                    ...fullscreenMediaProps
                } = {}) => (
                    <Media
                        {...themedMedia}
                        {...fullscreenMediaProps}
                        className={b('media', {border}, mediaClassName)}
                        analyticsEvents={analyticsEvents}
                    />
                )}
            </FullscreenMedia>
        ) : (
            <Media
                {...themedMedia}
                className={b('media', {border})}
                analyticsEvents={analyticsEvents}
            />
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
            {areControlsInFooter && links && (
                <Links className={b('links')} size="s" links={links} titleId={titleId} />
            )}
            {areControlsInFooter && buttons && (
                <Buttons className={b('buttons')} size="s" buttons={buttons} titleId={titleId} />
            )}
        </div>
    );
};

export default LayoutItem;
