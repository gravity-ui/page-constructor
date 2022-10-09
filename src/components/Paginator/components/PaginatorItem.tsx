import React from 'react';

import {Button} from '@yandex-cloud/uikit';

import {ArrowType, PaginatorItemProps} from '../types';

import {block} from '../../../utils/cn';

import '../Paginator.scss';

const b = block('paginator');

export const PaginatorItem = ({
    dataKey,
    mods,
    content,
    onClick,
    loading = false,
}: PaginatorItemProps) => {
    const itemKey = Number(dataKey) > 0 ? Number(dataKey) : (dataKey as ArrowType);

    return (
        <Button
            view="flat"
            size="xl"
            className={b('item', mods)}
            onClick={() => onClick?.(itemKey)}
            loading={loading && Boolean(mods.active)}
        >
            {content}
        </Button>
    );
};
