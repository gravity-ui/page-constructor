import React from 'react';

import {SelectOption as SelectOptionType} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';

import './CustomSelectOption.scss';

const b = block('feed-custom-select-option');

export type CustomSelectOptionProps = {
    data: {
        icon?: React.ReactElement;
    } & SelectOptionType;
};

export const CustomSelectOption = ({data}: CustomSelectOptionProps) => (
    <div className={b()}>
        <span className={b('icon')}>{data.icon}</span>
        <span>{data.content}</span>
    </div>
);
