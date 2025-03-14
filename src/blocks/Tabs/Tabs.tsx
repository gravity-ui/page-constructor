import * as React from 'react';

import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import Title from '../../components/Title/Title';
import {Col, GridJustifyContent, Row} from '../../grid';
import {TabsBlockProps} from '../../models';
import {block} from '../../utils';
import './Tabs.scss';
import {TabContent} from './TabContent/TabContent';
import {getUniqId} from '@gravity-ui/uikit';

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
    const [activeTab, setActiveTab] = React.useState<string | null>(items[0].tabName);
    const [play, setPlay] = React.useState<boolean>(false);

    const tabs: ButtonTabsItemProps[] = items.map(({tabName}) => ({title: tabName, id: tabName}));
    const isReverse = direction === 'content-media';

    const tabIds = React.useMemo(
        () =>
            items.reduce(
                (acc, {tabName}) => Object.assign(acc, {[tabName]: getUniqId()}),
                {} as Record<string, string>,
            ),
        [items],
    );

    const getTabElementId = (tabId: string) => `${tabIds[tabId]}`;
    const getTabContentElementId = (tabId: string) => `${tabIds[tabId]}-content`;

    const onSelectTab = React.useCallback(
        (tabId: string | null, e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            setActiveTab(tabId);
            e.currentTarget.scrollIntoView({
                inline: 'center',
                behavior: 'smooth',
                block: 'nearest',
            });
        },
        [],
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
                        getTabElementId={getTabElementId}
                        getTabContentElementId={getTabContentElementId}
                    />
                </Col>
            </Row>
            {items.map((tabData) => {
                const {tabName} = tabData;

                return (
                    <TabContent
                        key={tabName}
                        tabData={tabData}
                        isActive={tabName === activeTab}
                        isReverse={isReverse}
                        contentSize={contentSize}
                        centered={centered}
                        play={play}
                        getTabElementId={getTabElementId}
                        getTabContentElementId={getTabContentElementId}
                    />
                );
            })}
        </AnimateBlock>
    );
};

export default TabsBlock;
