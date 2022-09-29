import React from 'react';
import block from 'bem-cn-lite';

import {useLocaleContext} from '../../../hooks/contexts/useLocaleContext';

import {format} from '../../../utils/date';

import '../BlogInfo.scss';

const b = block('blog-info');

type BlogDateProps = {
    date: string | number;
    size?: 's' | 'm';
};

export const BlogDate: React.FC<BlogDateProps> = ({date, size = 's'}) => {
    const {locale} = useLocaleContext();

    return <div className={b('item', {size})}>{format(date, 'longDate', locale?.code)}</div>;
};
