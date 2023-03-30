import React from 'react';

import {Button} from '@gravity-ui/uikit';

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
    const navigationLink = `?${mods.type || 'page'}=${itemKey}`;

    return (
        <a
            href={navigationLink}
            className={b('link', mods)}
            onClick={(event) => event.preventDefault()}
        >
            <Button
                view="flat"
                size="xl"
                className={b('item', mods)}
                onClick={() => onClick?.(itemKey)}
                loading={loading && Boolean(mods.active)}
            >
                {content}
            </Button>
        </a>
    );
};
