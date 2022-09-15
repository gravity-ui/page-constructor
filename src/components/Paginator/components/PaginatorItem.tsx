import React from 'react';
import block from 'bem-cn-lite';

import {Button} from '@yandex-cloud/uikit';

import {ArrowType, PaginatorItemProps} from '../types';

import './PaginatorBlog.scss';

const b = block('PaginatorBlog');

export const PaginatorItem = ({
    dataKey,
    mods,
    content,
    onClick,
    loading = false,
}: PaginatorItemProps) => {
    const tKey = Number(dataKey) > 0 ? Number(dataKey) : (dataKey as ArrowType);

    return (
        <Button
            view="flat"
            size="xl"
            className={b('item', mods)}
            onClick={() => onClick?.(tKey)}
            loading={loading && Boolean(mods.active)}
        >
            {content}
        </Button>
    );
};
