import React, {Fragment, useContext, useState} from 'react';

import {block, getThemedValue} from '../../utils';
import {Row, Col, GridColumnOrderClasses} from '../../grid';
import {TabsBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import FullScreenImage from '../../components/FullscreenImage/FullscreenImage';
import Media from '../../components/Media/Media';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {getMediaImage} from '../../components/Media/Image/utils';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import {Content} from '../../sub-blocks';

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
}: TabsBlockProps) => {
    const [activeTab, setActiveTab] = useState(items[0].tabName);
    const [play, setPlay] = useState<boolean>(false);
    const {themeValue: theme} = useContext(ThemeValueContext);
    const tabs: ButtonTabsItemProps[] = items.map(({tabName}) => ({title: tabName, id: tabName}));
    const activeTabData = items.find(({tabName}) => tabName === activeTab);
    const isReverse = direction === 'content-media';

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
                    size="s"
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
            {activeTabData?.media && (
                <Media
                    {...getThemedValue(activeTabData.media, theme)}
                    key={activeTab}
                    className={b('media')}
                    playVideo={play}
                />
            )}
            {imageProps && (
                <Fragment>
                    <FullScreenImage {...imageProps} imageClassName={b('image')} />
                    {activeTabData?.caption && (
                        <p className={b('caption')}>{activeTabData.caption}</p>
                    )}
                </Fragment>
            )}
        </Col>
    );

    return (
        <AnimateBlock className={b()} onScroll={() => setPlay(true)} animate={animated}>
            <BlockHeader
                title={title}
                description={description}
                className={b('block-title', {centered: centered})}
            />
            <Row>
                <Col sizes={tabsColSizes}>
                    <ButtonTabs
                        items={tabs}
                        onSelectTab={setActiveTab}
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
