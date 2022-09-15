import React, {ReactNode} from 'react';
import block from 'bem-cn-lite';

import {Icon} from '@yandex-cloud/uikit';

import {DropdownArrow} from '../../../../icons/DropdownArrow';

import './CustomSwitcher.scss';

const b = block('blog-feed-custom-switcher');

export type SelectItem = {
    title: string;
    value: string;
    icon?: ReactNode;
};

type CustomSwitcherViewProps = {
    items: string[];
};

type CustomSwitcherProps = {
    initial: string | number | null;
    defaultLabel: string;
    list: SelectItem[];
};

const ICON_SIZE = 12;

export function CustomSwitcherView({items = []}: CustomSwitcherViewProps) {
    const hasCounter = items.length > 1;

    return (
        <div className={b('custom-switcher')}>
            <div className={b('custom-switcher-element', {content: true})}>{items?.join(', ')}</div>
            {hasCounter && (
                <div className={b('custom-switcher-element', {counter: true})}>{items.length}</div>
            )}
            <div className={b('custom-switcher-element', {arrow: true})}>
                <Icon data={DropdownArrow} size={ICON_SIZE} className={b('switcher-arrow')} />
            </div>
        </div>
    );
}

export const CustomSwitcher = ({initial, defaultLabel, list}: CustomSwitcherProps) => {
    if (initial && typeof initial === 'string') {
        const itemValues = initial.split(',');
        const itemNames = list
            .filter((item) => itemValues.includes(item.value))
            .map((item) => item.title);

        return <CustomSwitcherView items={itemNames} />;
    }

    return <CustomSwitcherView items={[defaultLabel]} />;
};
