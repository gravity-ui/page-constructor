import React, {Fragment, useRef, useState} from 'react';

import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import FullscreenImage from '../../components/FullscreenImage/FullscreenImage';
import {getMediaImage} from '../../components/Media/Image/utils';
import Media from '../../components/Media/Media';
import Title from '../../components/Title/Title';
import {getHeight} from '../../components/VideoBlock/VideoBlock';
import {useTheme} from '../../context/theme';
import {Col, GridColumnOrderClasses, Row} from '../../grid';
import {TabsBlockProps} from '../../models';
import {Content} from '../../sub-blocks';
import {block, getThemedValue} from '../../utils';

import './Tabs.scss';

const b = block('tabs-block');

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
    const [activeTab, setActiveTab] = useState<string | null>(items[0].tabName);
    const [play, setPlay] = useState<boolean>(false);
    const theme = useTheme();
    const tabs: ButtonTabsItemProps[] = items.map(({tabName}) => ({title: tabName, id: tabName}));
    const activeTabData = items.find(({tabName}) => tabName === activeTab);
    const isReverse = direction === 'content-media';
    const ref = useRef<HTMLDivElement>(null);
    const mediaWidth = ref?.current?.offsetWidth;
    const mediaHeight = mediaWidth && getHeight(mediaWidth);

    let imageProps;

    if (activeTabData) {
        const themedImage = getThemedValue(activeTabData.image, theme);

        imageProps = themedImage && getMediaImage(themedImage);
    }

    const showMedia = Boolean(activeTabData?.media || imageProps);
    const showText = Boolean(activeTabData?.text);

    const textContent = activeTabData && showText && (
        <Col
            sizes={{all: 12, md: showMedia ? 4 : 8}}
            className={b('content', {centered: centered})}
        >
            <div
                className={b('content-wrapper', {
                    margin: Boolean((activeTabData?.media || imageProps) && !isReverse),
                })}
            >
                <Content
                    title={activeTabData.title}
                    text={activeTabData.text}
                    additionalInfo={activeTabData.additionalInfo}
                    size={contentSize}
                    links={[
                        ...(activeTabData.link ? [activeTabData.link] : []),
                        ...(activeTabData.links || []),
                    ]}
                    buttons={activeTabData.buttons}
                    colSizes={{all: 12}}
                />
            </div>
        </Col>
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
            <div ref={ref}>
                {activeTabData?.media && (
                    <Media
                        {...getThemedValue(activeTabData.media, theme)}
                        key={activeTab}
                        className={b('media')}
                        playVideo={play}
                        height={mediaHeight}
                    />
                )}
            </div>
            {imageProps && (
                <Fragment>
                    <FullscreenImage {...imageProps} imageClassName={b('image')} />
                </Fragment>
            )}
            {activeTabData?.caption && <p className={b('caption')}>{activeTabData.caption}</p>}
        </Col>
    );

    const onSelectTab = (
        id: string | null,
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
        setActiveTab(id);
        e.currentTarget.scrollIntoView({inline: 'center', behavior: 'smooth', block: 'nearest'});
    };

    return (
        <AnimateBlock className={b()} onScroll={() => setPlay(true)} animate={animated}>
            <Title
                title={title}
                subtitle={description}
                className={b('block-title', {centered: centered})}
            />
            <Row>
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
