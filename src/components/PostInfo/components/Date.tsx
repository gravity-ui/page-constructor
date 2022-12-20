import React, {useContext} from 'react';

import {LocaleContext} from '../../../contexts/LocaleContext';

import {format} from '../../../utils/date';
import {block} from '../../../utils/cn';

import '../PostInfo.scss';

const b = block('post-info');

type DateProps = {
    date: string | number;
    size?: 's' | 'm';
};

export const Date: React.FC<DateProps> = ({date, size = 's'}) => {
    const {locale} = useContext(LocaleContext);

    return <div className={b('item', {size})}>{format(date, 'longDate', locale?.code)}</div>;
};
