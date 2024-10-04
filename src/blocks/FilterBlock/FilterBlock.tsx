import React, {useMemo, useState} from 'react';

import {CardLayoutBlock} from '..';
import {AnimateBlock, Title} from '../../components';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import {ConstructorItem} from '../../containers/PageConstructor/components/ConstructorItem';
import {Col, Grid, Row} from '../../grid';
import {FilterBlockProps, FilterItem} from '../../models';
import {block, getBlockKey} from '../../utils';

import {i18n} from './i18n';

import './FilterBlock.scss';

const b = block('filter-block');

const FilterBlock: React.FC<FilterBlockProps> = ({
    title,
    description,
    tags,
    tagButtonSize,
    allTag,
    items = [],
    colSizes,
    centered,
    animated,
}) => {
    const tabButtons = useMemo(() => {
        const allButton: ButtonTabsItemProps | undefined = allTag
            ? {id: null, title: typeof allTag === 'boolean' ? i18n('label-all-tag') : allTag}
            : undefined;
        const otherButtons: ButtonTabsItemProps[] | undefined =
            tags && tags.map((tag) => ({id: tag.id, title: tag.label}));
        return [...(allButton ? [allButton] : []), ...(otherButtons ? otherButtons : [])];
    }, [allTag, tags]);

    const [selectedTag, setSelectedTag] = useState(tabButtons.length ? tabButtons[0].id : null);

    const actualTag: string | null = useMemo(() => {
        return tabButtons.length && !tabButtons.find((tab) => tab.id === selectedTag)
            ? tabButtons[0].id
            : selectedTag;
    }, [tabButtons, selectedTag]);

    const cards = useMemo(() => {
        const itemsToShow: FilterItem[] = actualTag
            ? items.filter((item) => item.tags.includes(actualTag))
            : items;

        return itemsToShow.map((item) => item.card);
    }, [actualTag, items]);

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
                                onSelectTab={setSelectedTag}
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
