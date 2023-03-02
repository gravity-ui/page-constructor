import React, {useMemo, useState} from 'react';

import {block} from '../../utils';
import {BlockType, ConstructorItem, FilterBlockProps, FilterItem} from '../../models';
import {Row, Col} from '../../grid';
import {BlockHeader, AnimateBlock} from '../../components';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import {ConstructorBlocks} from '../../containers/PageConstructor/components/ConstructorBlocks';

import './FilterBlock.scss';

const b = block('filter-block');
const DEFAULT_ALL_TAG_TITLE = 'All';

const FilterBlock: React.FC<FilterBlockProps> = ({
    title,
    description,
    filterTags,
    tagSize,
    allTag,
    items,
    colSizes,
    animated,
}) => {
    const tabButtons = useMemo(() => {
        const allButton: ButtonTabsItemProps | undefined = allTag
            ? {id: null, title: typeof allTag === 'boolean' ? DEFAULT_ALL_TAG_TITLE : allTag}
            : undefined;
        const otherButtons: ButtonTabsItemProps[] | undefined =
            filterTags && filterTags.map((tag) => ({id: tag.id, title: tag.label}));
        return [...(allButton ? [allButton] : []), ...(otherButtons ? otherButtons : [])];
    }, [allTag, filterTags]);

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
            {title && <BlockHeader title={title} description={description} />}
            {tabButtons.length && (
                <Row>
                    <Col>
                        <ButtonTabs
                            className={b('tabs')}
                            items={tabButtons}
                            activeTab={selectedTag}
                            onSelectTab={setSelectedTag}
                            tabSize={tagSize}
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
