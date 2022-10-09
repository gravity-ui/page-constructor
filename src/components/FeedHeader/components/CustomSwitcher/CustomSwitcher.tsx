import React, {ReactNode, useMemo} from 'react';

import {Icon} from '@yandex-cloud/uikit';

import {DropdownArrow} from '../../../../icons/DropdownArrow';

import {block} from '../../../../utils/cn';

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

const CustomSwitcherView = ({items = []}: CustomSwitcherViewProps) => {
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
};

export const CustomSwitcher = ({initial, defaultLabel, list}: CustomSwitcherProps) => {
    const isInitialString = typeof initial === 'string';

    const itemsNames = useMemo(() => {
        const itemValues = isInitialString ? initial?.split(',') : [];

        return list.filter((item) => itemValues.includes(item.value)).map((item) => item.title);
    }, [initial, isInitialString, list]);

    if (initial && isInitialString) {
        return <CustomSwitcherView items={itemsNames} />;
    }

    return <CustomSwitcherView items={[defaultLabel]} />;
};
