import * as React from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {FullscreenMedia, IconWrapper, Media, MetaInfo} from '../../components';
import {useTheme} from '../../context/theme';
import {ContentBlockProps, LayoutItemProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import {mergeVideoMicrodata} from '../../utils/microdata';
import Content from '../Content/Content';

import {getLayoutItemLinks, hasFullscreen, showFullscreenIcon} from './utils';

import './LayoutItem.scss';

const b = block('layout-item');

const LayoutItem = ({
    content: {links, ...content},
    contentMargin = 'm',
    metaInfo,
    media,
    border,
    fullscreen,
    icon,
    className,
    analyticsEvents,
    controlPosition = 'content',
}: LayoutItemProps) => {
    const normalizedLinks = React.useMemo(() => getLayoutItemLinks(links), [links]);
    const areControlsInFooter = controlPosition === 'footer';
    const theme = useTheme();
    const themedIcon = getThemedValue(icon, theme);

    const contentProps: ContentBlockProps = {
        controlPosition: areControlsInFooter ? 'bottom' : 'default',
        ...content,
        links: normalizedLinks,
        size: content.size || 's',
        colSizes: {all: 12, md: 12},
    };
    const titleId = useUniqId();
    const renderMedia = () => {
        if (!media) {
            return null;
        }
        const themedMedia = getThemedValue(media, theme);
        const {title} = content;
        const mediaWithMicrodata = mergeVideoMicrodata(themedMedia, {
            name: typeof title === 'string' ? title : title?.text,
            description: content.text,
        });

        return fullscreen && hasFullscreen(themedMedia) ? (
            <FullscreenMedia showFullscreenIcon={showFullscreenIcon(themedMedia)}>
                {({
                    className: mediaClassName,
                    fullscreen: _fullscreen,
                    ...fullscreenMediaProps
                } = {}) => (
                    <Media
                        {...mediaWithMicrodata}
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
            <div className={b('content', {'no-media': !media, margin: contentMargin})}>
                <IconWrapper icon={themedIcon} className={b('wrapper')} size={contentProps.size}>
                    <Content {...contentProps} titleId={titleId} />
                </IconWrapper>
            </div>
        </div>
    );
};

export default LayoutItem;
