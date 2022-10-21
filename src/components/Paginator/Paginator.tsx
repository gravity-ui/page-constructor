import React, {useEffect, useState, useMemo} from 'react';

import {BlogMetrikaGoalIds} from '../../constants';

import metrika from '../../counters/metrika.js';
import {MetrikaCounter} from '../../counters/utils';

import {getPageConfigs, getPagesCount} from './utils';
import {ArrowType, PaginatorItemProps, PaginatorProps} from './types';

import {block} from '../../utils/cn';

import {NavigationButton} from './components/NavigationButton';
import {PaginatorItem} from './components/PaginatorItem';

import './Paginator.scss';

const b = block('paginator');

const DEFAULT_PAGE_COUNT_FOR_SHOW_SUPPORT_BUTTONS = 6;

export const Paginator = ({
    itemsPerPage,
    totalItems,
    maxPages,
    page,
    className,
    loading,
    onPageChange,
    pageCountForShowSupportButtons = DEFAULT_PAGE_COUNT_FOR_SHOW_SUPPORT_BUTTONS,
}: PaginatorProps) => {
    const [pagesCount, setPagesCount] = useState(
        getPagesCount({itemsPerPage, totalItems, maxPages}),
    );

    useEffect(() => {
        const count = getPagesCount({itemsPerPage, totalItems, maxPages});
        setPagesCount(count);
    }, [itemsPerPage, totalItems, maxPages]);

    const handlePageChange = (pageIndex: number) => onPageChange?.(pageIndex);

    const isShowSupportButtons = useMemo(
        () => pagesCount > pageCountForShowSupportButtons,
        [pageCountForShowSupportButtons, pagesCount],
    );

    if (pagesCount <= 1) {
        return null;
    }

    const handleArrowClick = (type: ArrowType | number) => {
        let newPage = page;

        if (type === 'prev' && page > 1) {
            metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.home);
            newPage = 1;
        } else if (type === 'next' && page < pagesCount) {
            metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.next);
            newPage = page + 1;
        }

        if (newPage !== page) {
            handlePageChange(newPage);
        }
    };

    const handlePageClick = (index: number | ArrowType) => {
        if (index !== page && typeof index === 'number') {
            metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.page, {page: index});
            handlePageChange(index);
        }
    };

    const paginatorItems = getPageConfigs({page, pagesCount, handlePageClick});

    if (page > 1 && isShowSupportButtons) {
        paginatorItems.unshift({
            key: ArrowType.Prev,
            dataKey: ArrowType.Prev,
            mods: {type: ArrowType.Prev},
            onClick: handleArrowClick,
            content: <NavigationButton arrowType={ArrowType.Prev} />,
        });
    }

    if (page < pagesCount && isShowSupportButtons) {
        paginatorItems.push({
            key: ArrowType.Next,
            dataKey: ArrowType.Next,
            mods: {type: ArrowType.Next},
            onClick: handleArrowClick,
            content: <NavigationButton arrowType={ArrowType.Next} />,
        });
    }

    const renderPaginatorItem = (item: PaginatorItemProps) => {
        const {key, ...rest} = item;
        return <PaginatorItem key={`page_${key}`} {...rest} loading={loading} />;
    };

    return (
        <div className={b('pagination')}>
            {page > 1 && (
                <div className={b('pagination-block')}>
                    <ul className={b(null, className)}>
                        {paginatorItems.slice(0, 1).map(renderPaginatorItem)}
                    </ul>
                </div>
            )}
            <div className={b('pagination-block')}>
                <ul className={b(null, className)}>
                    {paginatorItems
                        .slice(
                            page > 1 ? 1 : 0,
                            page < pagesCount ? paginatorItems.length - 1 : paginatorItems.length,
                        )
                        .map(renderPaginatorItem)}
                </ul>
            </div>
            {page < pagesCount && (
                <div className={b('pagination-block')}>
                    <ul className={b(null, className)}>
                        {paginatorItems
                            .slice(paginatorItems.length - 1, paginatorItems.length)
                            .map(renderPaginatorItem)}
                    </ul>
                </div>
            )}
        </div>
    );
};
