import React from 'react';

import {block} from '../../utils/cn';

import './PostsEmpty.scss';

import {i18, Keyset} from '../../i18n';

const b = block('posts-empty');

export const PostsEmpty: React.FC = () => (
    <div className={b('container')}>
        <div className={b('title')}>{i18(Keyset.TitleEmptyContainer)}</div>
        <div className={b('subtitle')}>{i18(Keyset.ContextEmptyContainer)}</div>
    </div>
);
