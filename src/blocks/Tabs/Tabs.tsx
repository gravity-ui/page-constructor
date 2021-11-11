import React, {Fragment, useState} from 'react';
import {Tabs} from '@yandex-data-ui/common';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import {Row, Col, GridColumnOrderClasses} from '../../grid';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {ImageObjectProps, TabsBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import FullScreenImage from '../../components/FullscreenImage/FullscreenImage';
import Media from '../../components/Media/Media';
import Links from '../../components/Link/Links';

import './Tabs.scss';

const b = block('TabsBlock');

const TabsBlock: React.FunctionComponent<TabsBlockProps> = ({
    items,
    title,
    description,
    animated,
}) => {
    const [activeTab, setActiveTab] = useState(items[0].tabName);
    const [play, setPlay] = useState<boolean>(false);
    const tabs = items.map(({tabName}) => ({title: tabName, id: tabName}));
    const activeTabData = items.find(({tabName}) => tabName === activeTab);

    const imageProps: ImageObjectProps | undefined =
        activeTabData &&
        (typeof activeTabData.image === 'string'
            ? {src: activeTabData.image}
            : activeTabData.image);

    return (
        <AnimateBlock className={b()} onScroll={() => setPlay(true)} animate={animated}>
            <BlockHeader title={title} description={description} className={b('block-title')} />
            <Tabs
                className={b('tabs')}
                items={tabs}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
            />
            {activeTabData && (
                <Row>
                    <Col
                        sizes={{all: 12, md: 8}}
                        orders={{
                            all: GridColumnOrderClasses.Last,
                            md: GridColumnOrderClasses.First,
                        }}
                    >
                        {activeTabData.media ? (
                            <Media
                                key={activeTab}
                                className={b('media')}
                                {...activeTabData.media}
                                playVideo={play}
                            />
                        ) : (
                            <Fragment>
                                <FullScreenImage
                                    imageClassName={b('image')}
                                    src={(imageProps && imageProps.src) || 'default_image'}
                                    alt={imageProps && imageProps.alt}
                                />
                                {activeTabData.caption && (
                                    <caption className={b('caption')}>
                                        {activeTabData.caption}
                                    </caption>
                                )}
                            </Fragment>
                        )}
                    </Col>
                    <Col sizes={{all: 12, md: 4}} className={b('content')}>
                        <div className={b('content-margin')}>
                            <h4 className={b('content-title')}>
                                <HTML>{activeTabData.title}</HTML>
                            </h4>
                            <YFMWrapper content={activeTabData.text} />
                            <Links
                                links={[
                                    ...(activeTabData.link ? [activeTabData.link] : []),
                                    ...(activeTabData.links || []),
                                ]}
                                className={b('link')}
                            />
                        </div>
                    </Col>
                </Row>
            )}
        </AnimateBlock>
    );
};

export default TabsBlock;
