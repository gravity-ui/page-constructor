import React from 'react';
import block from 'bem-cn-lite';

import './PostsEmpty.scss';

import {i18, BlogKeyset} from '../../i18n';

const b = block('PostsEmpty');

export const PostsEmpty: React.FC = () => (
    <div className={b('container')}>
        <div className={b('title')}>{i18(BlogKeyset.TitleEmptyContainer)}</div>
        <div className={b('subtitle')}>{i18(BlogKeyset.ContextEmptyContainer)}</div>
    </div>
);
