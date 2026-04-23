import * as React from 'react';

import {CardLayoutBlock} from '..';
import {AnimateBlock, Title} from '../../components';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import {ConstructorItem} from '../../containers/PageConstructor/components/ConstructorItem';
import {Col, Grid, Row} from '../../gravity-blocks/grid';
import {useAnalytics} from '../../gravity-blocks/hooks';
import {FilterBlockProps, FilterItem} from '../../models';
import {block, getBlockKey} from '../../utils';

import {i18n} from './i18n';

import './FilterBlock.scss';

const b = block('filter-block');

const FilterBlock = ({
    title,
    description,
    tags,
    tagButtonSize,
    allTag,
    items = [],
    colSizes,
    centered,
    animated,
}: FilterBlockProps) => {
    const handleAnalytics = useAnalytics();
    const tabButtons = React.useMemo(() => {
        let allButton: ButtonTabsItemProps | undefined;
        if (allTag) {
            if (typeof allTag === 'boolean') {
                allButton = {
                    id: null,
                    title: i18n('label-all-tag'),
                };
            } else if (typeof allTag === 'string') {
                allButton = {
                    id: null,
                    title: allTag,
                };
            } else if (typeof allTag === 'object') {
                allButton = {
                    id: null,
                    title: allTag.label,
                    analyticsEvent: allTag.analyticsEvent,
                };
            }
        }
        const otherButtons: ButtonTabsItemProps[] | undefined =
            tags &&
            tags.map((tag) => ({
                id: tag.id,
                title: tag.label,
                analyticsEvent: tag.analyticsEvent,
            }));
        return [...(allButton ? [allButton] : []), ...(otherButtons ? otherButtons : [])];
    }, [allTag, tags]);

    const [selectedTag, setSelectedTag] = React.useState(
        tabButtons.length ? tabButtons[0].id : null,
    );

    const actualTag: string | null = React.useMemo(() => {
        return tabButtons.length && !tabButtons.find((tab) => tab.id === selectedTag)
            ? tabButtons[0].id
            : selectedTag;
    }, [tabButtons, selectedTag]);

    const cards = React.useMemo(() => {
        const itemsToShow: FilterItem[] = actualTag
            ? items.filter((item) => item.tags.includes(actualTag))
            : items;

        return itemsToShow.map((item) => item.card);
    }, [actualTag, items]);

    const handleSelectTab = React.useCallback(
        (tabId: string | null) => {
            setSelectedTag(tabId);

            const tabButton = tabButtons.find((tab) => tab.id === tabId);
            if (tabButton?.analyticsEvent) {
                handleAnalytics(tabButton.analyticsEvent);
            }
        },
        [tabButtons, handleAnalytics],
    );

    return (
        <AnimateBlock className={b()} animate={animated}>
            <Grid>
                {title && (
                    <Title
                        className={b('title', {centered: centered})}
                        title={title}
                        subtitle={description}
                    />
                )}
                {tabButtons.length && (
                    <Row>
                        <Col>
                            <ButtonTabs
                                className={b('tabs', {centered: centered})}
                                items={tabButtons}
                                activeTab={selectedTag}
                                onSelectTab={handleSelectTab}
                                tabSize={tagButtonSize}
                            />
                        </Col>
                    </Row>
                )}
                <Row className={b('block-container')}>
                    <CardLayoutBlock title="" colSizes={colSizes} className={b('cards-container')}>
                        {cards.map((card, index) => {
                            const key = getBlockKey(card, index);
                            return <ConstructorItem data={card} blockKey={index} key={key} />;
                        })}
                    </CardLayoutBlock>
                </Row>
            </Grid>
        </AnimateBlock>
    );
};
export default FilterBlock;
