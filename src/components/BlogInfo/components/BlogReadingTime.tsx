import React from 'react';
import block from 'bem-cn-lite';

import {Icon} from '@yandex-cloud/uikit';

import {i18, BlogKeysetWords} from 'src/i18n';

import timeIcon from 'icons/time.svg';

import '../BlogInfo.scss';

const b = block('blog-info');

const ICON_SIZE = 16;

type BlogReadingTimeProps = {
    readingTime: number;
    size?: 's' | 'm';
};

export const BlogReadingTime: React.FC<BlogReadingTimeProps> = ({readingTime, size = 's'}) => (
    <div className={b('item', {size})}>
        <span className={b('icon')}>
            <Icon data={timeIcon} size={ICON_SIZE} className={b('icon-color')} />
        </span>
        {i18(BlogKeysetWords.contextReadingTime, {count: readingTime})}
    </div>
);
