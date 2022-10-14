import {GetPageConfigParams, PaginatorItemProps, PaginatorProps} from './types';

const MAX_VISIBLE_PAGES = 5;

export const getPageConfigs = ({page, pagesCount, handlePageClick}: GetPageConfigParams) => {
    const paginatorItems: Array<PaginatorItemProps> = [];
    // it is calculating the middle of visible pages below
    const pageOffset = (MAX_VISIBLE_PAGES - 1) / 2;
    let startPage = page - pageOffset;
    let endPage = page + pageOffset;

    if (startPage < 1) {
        endPage = page + pageOffset - startPage + 1;
        startPage = 1;
    }

    endPage = Math.min(endPage, pagesCount);

    for (let i = startPage; i <= endPage; i++) {
        paginatorItems.push({
            key: String(i),
            dataKey: String(i),
            mods: {type: 'page', active: page === i},
            onClick: handlePageClick,
            content: i,
        });
    }

    return paginatorItems;
};

export const getPagesCount = (
    props: Pick<PaginatorProps, 'totalItems' | 'itemsPerPage' | 'maxPages'>,
) => {
    const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

    return Math.min(totalPages, props.maxPages);
};
