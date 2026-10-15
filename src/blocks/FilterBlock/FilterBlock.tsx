import * as React from 'react';

import {Button} from '@gravity-ui/uikit';

import {AnimateBlock, Title} from '../../components';
import ButtonTabs, {ButtonTabsItemProps} from '../../components/ButtonTabs/ButtonTabs';
import {BREAKPOINTS} from '../../constants';
import {ConstructorItem} from '../../containers/PageConstructor/components/ConstructorItem';
import {useWindowWidth} from '../../context/windowWidthContext';
import {Col, Row} from '../../grid';
import {GridColumnSize, GridColumnSizesType} from '../../grid/types';
import {useAnalytics} from '../../hooks';
import {FilterBlockProps} from '../../models';
import {block, getBlockKey} from '../../utils';
import CardLayoutBlock, {DEFAULT_SIZES} from '../CardLayout/CardLayout';

import {i18n} from './i18n';

import './FilterBlock.scss';

const b = block('filter-block');

const GRID_COLUMN_SIZES = [
    GridColumnSize.Sm,
    GridColumnSize.Md,
    GridColumnSize.Lg,
    GridColumnSize.Xl,
] as const;

function responsiveValue(values: GridColumnSizesType, width: number, fallback: number) {
    let result = values.all ?? fallback;

    for (const size of GRID_COLUMN_SIZES) {
        const value = values[size];

        if (width >= BREAKPOINTS[size] && value !== undefined) {
            result = value;
        }
    }

    return result;
}

const FilterBlock = ({
    title,
    description,
    tags,
    tagButtonSize,
    allTag,
    items,
    colSizes = DEFAULT_SIZES,
    visibleRowsCount,
    expandButtonText,
    collapseButtonText,
    centered,
    animated,
}: FilterBlockProps) => {
    const handleAnalytics = useAnalytics();
    const width = useWindowWidth();
    const [expanded, setExpanded] = React.useState(false);
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

    React.useEffect(() => {
        setExpanded(false);
    }, [actualTag]);

    const cards = React.useMemo(() => {
        const itemsWithKeys = items.map((item, index) => ({
            ...item,
            key: getBlockKey(item.card, index),
        }));

        return actualTag
            ? itemsWithKeys.filter((item) => item.tags.includes(actualTag))
            : itemsWithKeys;
    }, [actualTag, items]);

    const allTagConfig = typeof allTag === 'object' ? allTag : undefined;
    const activeTag = actualTag === null ? allTagConfig : tags?.find((tag) => tag.id === actualTag);
    const rows = responsiveValue(visibleRowsCount ?? {}, width, Infinity);
    const columns = Math.max(1, Math.floor(12 / responsiveValue(colSizes, width, 12)));
    const limit = rows > 0 ? Math.floor(rows) * columns : Infinity;
    const canCollapse = Boolean(activeTag?.collapsible && cards.length > limit);
    const visibleCards = canCollapse && !expanded ? cards.slice(0, limit) : cards;

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
                            activeTab={actualTag}
                            onSelectTab={handleSelectTab}
                            tabSize={tagButtonSize}
                        />
                    </Col>
                </Row>
            )}
            <Row className={b('block-container')}>
                <CardLayoutBlock title="" colSizes={colSizes} className={b('cards-container')}>
                    {visibleCards.map(({card, key}) => (
                        <ConstructorItem data={card} blockKey={key} key={key} />
                    ))}
                </CardLayoutBlock>
            </Row>
            {canCollapse && (
                <Button
                    className={b('toggle')}
                    view="normal"
                    size="xl"
                    width="max"
                    aria-expanded={expanded}
                    onClick={() => setExpanded((value) => !value)}
                >
                    {expanded
                        ? (collapseButtonText ?? i18n('label-collapse'))
                        : (expandButtonText ?? i18n('label-expand'))}
                </Button>
            )}
        </AnimateBlock>
    );
};
export default FilterBlock;
