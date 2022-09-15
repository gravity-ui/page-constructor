import {ReactNode} from 'react';
import {Modifications} from 'bem-cn-lite';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';

export interface PaginatorItemProps {
    key: string | ArrowType;
    dataKey: string | ArrowType;
    mods: Modifications;
    content: ReactNode;
    onClick?: (key: number | ArrowType) => void;
    loading?: boolean;
}

export type PaginatorProps = {
    page: number;
    totalItems: number;
    itemsPerPage: number;
    maxPages: number;
    loading: boolean;
    onPageChange: (page: number) => void;
} & ClassNameProps;

export enum ArrowType {
    Prev = 'prev',
    Next = 'next',
}

export type GetPageConfigParams = {
    page: number;
    pagesCount: number;
    handlePageClick: (key: number | ArrowType) => void;
};
