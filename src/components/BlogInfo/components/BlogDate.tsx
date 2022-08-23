import React, {useContext} from 'react';
import block from 'bem-cn-lite';

import {LocaleContext} from 'contexts/LocaleContext';

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
    const {locale} = useContext(LocaleContext);

    return <div className={b('item', {size})}>{format(date, 'longDate', locale.code)}</div>;
};
