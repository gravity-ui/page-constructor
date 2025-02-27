import {useUniqId} from '@gravity-ui/uikit';
import * as React from 'react';

import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import FullscreenImage from '../../components/FullscreenImage/FullscreenImage';
import {getMediaImage} from '../../components/Media/Image/utils';
import Media from '../../components/Media/Media';
import Title from '../../components/Title/Title';
import {getHeight} from '../../components/VideoBlock/VideoBlock';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {useTheme} from '../../context/theme';
import {Col, GridColumnOrderClasses, GridJustifyContent, Row} from '../../grid';
import {TabsBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import {mergeVideoMicrodata} from '../../utils/microdata';

import TabsTextContent from './TabsTextContent/TabsTextContent';
import './Tabs.scss';

const b = block('tabs-block');

// eslint-disable-next-line complexity
export const TabsBlock = ({
    items,
    title,
    description,
    animated,
    tabsColSizes,
    centered,
    direction = 'media-content',
    contentSize = 's',
}: TabsBlockProps) => {
    const [activeTab, setActiveTab] = React.useState<string | null>(items[0].tabName);
    const [play, setPlay] = React.useState<boolean>(false);
    const theme = useTheme();
    const tabs: ButtonTabsItemProps[] = items.map(({tabName}) => ({title: tabName, id: tabName}));
    const activeTabData = items.find(({tabName}) => tabName === activeTab);
    const isReverse = direction === 'content-media';
    const ref = React.useRef<HTMLDivElement>(null);
    const mediaWidth = ref?.current?.offsetWidth;
    const captionId = useUniqId();
    const themedMedia = getThemedValue(activeTabData?.media, theme);
    const hasNoImage = !themedMedia?.image && !activeTabData?.image;
    const mediaVideoHeight = hasNoImage && mediaWidth && getHeight(mediaWidth);
    const [minImageHeight, setMinImageHeight] = React.useState(ref?.current?.offsetHeight);
    // TODO remove property support activeTabData?.image. Use only activeTabData?.media?.image
    let imageProps;

    const handleImageHeight = React.useCallback(() => {
        if (minImageHeight !== ref?.current?.offsetHeight) {
            setMinImageHeight(ref?.current?.offsetHeight);
        }
    }, [minImageHeight]);

    const onSelectTab = React.useCallback(
        (id: string | null, e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            setActiveTab(id);
            e.currentTarget.scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
                block: 'nearest',
            });
        },
        [],
    );

    React.useEffect(() => {
        handleImageHeight();
    }, [activeTab, handleImageHeight]);

    if (activeTabData) {
        const themedImage = getThemedValue(activeTabData?.image, theme);

        imageProps = themedImage && getMediaImage(themedImage);

        if (activeTabData.caption && imageProps) {
            Object.assign(imageProps, {
                'aria-describedby': captionId,
            });
        }
    }

    const showMedia = Boolean(activeTabData?.media || imageProps);
    const showText = Boolean(activeTabData?.text);
    const border = activeTabData?.border || 'shadow';

    const textContent = showText && (
        <TabsTextContent
            showMedia={showMedia}
            data={activeTabData}
            imageProps={imageProps ? imageProps : undefined}
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
            {activeTabData?.media && (
                <div style={{minHeight: mediaVideoHeight || minImageHeight}}>
                    <div ref={ref}>
                        <Media
                            {...mergeVideoMicrodata(getThemedValue(activeTabData.media, theme), {
                                name: activeTabData.tabName,
                                description: activeTabData.caption
                                    ? activeTabData.caption
                                    : undefined,
                            })}
                            key={activeTab}
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
            {activeTabData?.caption && (
                <p className={b('caption')} id={captionId}>
                    <YFMWrapper
                        content={activeTabData.caption}
                        modifiers={{constructor: true}}
                        id={captionId}
                    />
                </p>
            )}
        </Col>
    );

    return (
        <AnimateBlock className={b()} onScroll={() => setPlay(true)} animate={animated}>
            <Title
                title={title}
                subtitle={description}
                className={b('title', {centered: centered})}
            />
            <Row justifyContent={centered ? GridJustifyContent.Center : undefined}>
                <Col sizes={tabsColSizes}>
                    <ButtonTabs
                        items={tabs}
                        onSelectTab={onSelectTab}
                        activeTab={activeTab}
                        className={b('tabs', {centered: centered})}
                    />
                </Col>
            </Row>
            {activeTabData && (
                <Row className={b('row', {reverse: isReverse})}>
                    {mediaContent}
                    {textContent}
                </Row>
            )}
        </AnimateBlock>
    );
};

export default TabsBlock;
