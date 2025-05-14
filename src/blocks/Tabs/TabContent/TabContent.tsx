import * as React from 'react';
import {ContentSize, TabsBlockItem} from '../../../models';
import {ProjectSettingsContext} from '../../../context/projectSettingsContext';
import {block, getThemedValue} from '../../../utils';
import {useTheme} from '../../../context/theme';
import {getHeight} from '../../../components/VideoBlock/VideoBlock';
import {getMediaImage} from '../../../components/Media/Image/utils';
import TabsTextContent from '../TabsTextContent/TabsTextContent';
import {Col, GridColumnOrderClasses, Row} from '../../../grid';
import Media from '../../../components/Media/Media';
import {mergeVideoMicrodata} from '../../../utils/microdata';
import {FullscreenImage, YFMWrapper} from '../../../components';
import {useUniqId} from '@gravity-ui/uikit';

import './TabContent.scss';

const b = block('tab-content');

export interface TabContentProps {
    tabData: TabsBlockItem;
    isActive: boolean;
    isReverse: boolean;
    contentSize: ContentSize;
    centered?: boolean;
    play: boolean;
    getTabElementId?: (tabId: string) => string;
    getTabContentElementId?: (tabId: string) => string;
}

export const TabContent = ({
    tabData,
    isActive,
    isReverse,
    contentSize,
    centered,
    play,
    getTabElementId,
    getTabContentElementId,
}: TabContentProps) => {
    const {tabName} = tabData;

    const mediaContainerRef = React.useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const {renderInvisibleBlocks} = React.useContext(ProjectSettingsContext);

    const captionId = useUniqId();

    const mediaWidth = mediaContainerRef?.current?.offsetWidth;
    const [minImageHeight, setMinImageHeight] = React.useState(
        mediaContainerRef?.current?.offsetHeight,
    );

    const shouldRender = renderInvisibleBlocks || isActive;

    const themedImage = getThemedValue(tabData.image, theme);
    const themedMedia = getThemedValue(tabData.media, theme);

    const hasNoImage = !themedMedia?.image && !tabData.image;
    const mediaVideoHeight = hasNoImage && mediaWidth && getHeight(mediaWidth);

    // TODO remove property support activeTabData?.image. Use only activeTabData?.media?.image
    const imageProps = React.useMemo(() => {
        const imagePropsResult = themedImage && getMediaImage(themedImage);

        if (tabData.caption && imagePropsResult) {
            Object.assign(imagePropsResult, {
                'aria-describedby': captionId,
            });
        }

        return imagePropsResult;
    }, [captionId, tabData.caption, themedImage]);

    const handleImageHeight = React.useCallback(() => {
        if (minImageHeight !== mediaContainerRef?.current?.offsetHeight) {
            setMinImageHeight(mediaContainerRef?.current?.offsetHeight);
        }
    }, [minImageHeight]);

    React.useEffect(() => {
        handleImageHeight();
    }, [isActive, handleImageHeight]);

    if (!shouldRender) {
        return null;
    }

    const showMedia = isActive && Boolean(tabData.media || imageProps);
    const showText = Boolean(tabData.text);
    const border = tabData.border || 'shadow';

    const textContent = showText && (
        <TabsTextContent
            showMedia={showMedia}
            data={tabData}
            imageProps={imageProps || undefined}
            isReverse={isReverse}
            contentSize={contentSize}
            centered={centered}
        />
    );

    const mediaContent = showMedia && (
        <Col
            sizes={{all: 12, md: 8}}
            orders={{
                all: GridColumnOrderClasses.Last,
                md: GridColumnOrderClasses.First,
            }}
            className={b('col', {centered: centered})}
        >
            {tabData.media && (
                <div style={{minHeight: mediaVideoHeight || minImageHeight}}>
                    <div ref={mediaContainerRef}>
                        <Media
                            {...mergeVideoMicrodata(getThemedValue(tabData.media, theme), {
                                name: tabData.tabName,
                                description: tabData.caption ? tabData.caption : undefined,
                            })}
                            key={tabName}
                            className={b('media', {border})}
                            playVideo={play}
                            height={mediaVideoHeight || undefined}
                            onImageLoad={handleImageHeight}
                        />
                    </div>
                </div>
            )}
            {imageProps && (
                <React.Fragment>
                    <FullscreenImage {...imageProps} imageClassName={b('image', {border})} />
                </React.Fragment>
            )}
            {tabData.caption && (
                <div className={b('caption')} id={captionId}>
                    <YFMWrapper
                        content={tabData.caption}
                        modifiers={{constructor: true}}
                        id={captionId}
                    />
                </div>
            )}
        </Col>
    );

    return (
        <Row
            key={tabName}
            className={b('row', {reverse: isReverse, hidden: !isActive})}
            id={getTabContentElementId?.(tabName)}
            role="tabpanel"
            ariaProps={{
                'aria-labelledby': getTabElementId?.(tabName),
            }}
        >
            {mediaContent}
            {textContent}
        </Row>
    );
};
