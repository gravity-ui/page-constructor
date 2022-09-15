import React from 'react';
import block from 'bem-cn-lite';

import {ArrowType} from '../types';

import {i18, BlogKeyset} from '../../../i18n';

import '../Paginator.scss';

const b = block('PaginatorBlog');

export type NavigationButtonProps = {
    arrowType: ArrowType;
    disabled?: boolean;
};

export const NavigationButton = ({arrowType, disabled}: NavigationButtonProps) =>
    disabled ? null : (
        <div className={b('icon')}>
            {arrowType === ArrowType.Prev
                ? i18(BlogKeyset.ButtonBegin)
                : i18(BlogKeyset.ButtonFarther)}
        </div>
    );
