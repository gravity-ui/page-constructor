import React, {useMemo, useState} from 'react';

import {block} from '../../utils';
import {FilterBlockProps as FilterBlockParams} from '../../models';
import {Row, Col} from '../../grid';
import {BlockHeader, AnimateBlock} from '../../components';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';

import FilterBlockContext, {FilterData} from './FilterBlockContext';

import './FilterBlock.scss';

export interface FilterableProps extends Omit<FilterBlockParams, 'child'> {
    children?: React.ReactNode;
}

const b = block('filter-block');
const DEFAULT_ALL_TAG_TITLE = 'All';

const FilterBlock: React.FC<FilterableProps> = ({
    title,
    description,
    filterTags,
    tagSize,
    allTag,
    animated,
    children,
}) => {
    const tabButtons = useMemo(() => {
        const allButton: ButtonTabsItemProps | undefined = allTag
            ? {id: '', title: typeof allTag === 'boolean' ? DEFAULT_ALL_TAG_TITLE : allTag}
            : undefined;
        const otherButtons: ButtonTabsItemProps[] | undefined =
            filterTags && filterTags.map((tag) => ({id: tag.id, title: tag.label}));
        return [...(allButton ? [allButton] : []), ...(otherButtons ? otherButtons : [])];
    }, [allTag, filterTags]);

    const [selectedTag, setSelectedTag] = useState<string>(
        tabButtons.length ? tabButtons[0].id : '',
    );
    const data = useMemo<FilterData>(() => {
        const actualTag =
            tabButtons.length && !tabButtons.find((tab) => tab.id === selectedTag)
                ? tabButtons[0].id
                : selectedTag;

        return {
            selectedTag: actualTag,
        };
    }, [tabButtons, selectedTag]);

    return (
        <AnimateBlock className={b()} animate={animated}>
            {title && <BlockHeader title={title} description={description} />}
            {tabButtons.length && (
                <Row>
                    <Col>
                        <ButtonTabs
                            className={b('tabs')}
                            items={tabButtons}
                            activeTab={data.selectedTag}
                            onSelectTab={setSelectedTag}
                            tabSize={tagSize}
                        />
                    </Col>
                </Row>
            )}
            <Row>
                <FilterBlockContext.Provider value={data}>{children}</FilterBlockContext.Provider>
            </Row>
        </AnimateBlock>
    );
};

export default FilterBlock;
