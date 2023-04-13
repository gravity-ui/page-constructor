import React, {useMemo, useState} from 'react';

import {AnimateBlock, BlockHeader} from '../../components';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import {ConstructorBlocks} from '../../containers/PageConstructor/components/ConstructorBlocks';
import {Col, Row} from '../../grid';
import {BlockType, ConstructorItem, FilterBlockProps, FilterItem} from '../../models';
import {block} from '../../utils';

import i18n from './i18n';

import './FilterBlock.scss';

const b = block('filter-block');

const FilterBlock: React.FC<FilterBlockProps> = ({
    title,
    description,
    tags,
    tagButtonSize,
    allTag,
    items,
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

    const container: ConstructorItem[] = useMemo(() => {
        const itemsToShow: FilterItem[] = actualTag
            ? items.filter((item) => item.tags.includes(actualTag))
            : items;
        return [
            {
                type: BlockType.CardLayoutBlock,
                title: '',
                colSizes: colSizes,
                children: itemsToShow.map((item) => item.card),
            },
        ];
    }, [actualTag, items, colSizes]);

    return (
        <AnimateBlock className={b()} animate={animated}>
            {title && (
                <BlockHeader
                    className={b('title', {centered: centered})}
                    title={title}
                    description={description}
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
                <ConstructorBlocks items={container} />
            </Row>
        </AnimateBlock>
    );
};
export default FilterBlock;
