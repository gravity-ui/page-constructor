import React from 'react';
import block from 'bem-cn-lite';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444

import {format} from 'utils/date';

import '../BlogInfo.scss';

const b = block('blog-info');

type BlogDateProps = {
    date: string | number;
    size?: 's' | 'm';
};

/**
 * Component for blog created date UI-element
 *
 * @param data - blog created date
 * @param size - text size
 *
 * @returns jsx
 */
export const BlogDate: React.FC<BlogDateProps> = ({date, size = 's'}) => {
    // const {locale} = useContext(LocaleContext); //TODO add locale in context

    return <div className={b('item', {size})}>{format(date, 'longDate', 'ru-Ru')}</div>; //TODO add live data
};
