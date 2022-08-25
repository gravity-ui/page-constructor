import React, {useContext} from 'react';
import block from 'bem-cn-lite';

import {Icon} from '@yandex-cloud/uikit';

import {TranslationContext} from 'contexts/TranslationContext';

import {Time} from 'icons/Time';

import '../BlogInfo.scss';

const b = block('blog-info');

const ICON_SIZE = 16;

type BlogReadingTimeProps = {
    readingTime: number;
    size?: 's' | 'm';
};

export const BlogReadingTime: React.FC<BlogReadingTimeProps> = ({readingTime, size = 's'}) => {
    // TODO refactor in https://st.yandex-team.ru/ORION-1444
    const {i18n} = useContext(TranslationContext);

    return (
        <div className={b('item', {size})}>
            <span className={b('icon')}>
                <Icon data={Time} size={ICON_SIZE} className={b('icon-color')} />
            </span>
            {i18n('blog', 'context-reading_time', {count: readingTime})}
        </div>
    );
};
