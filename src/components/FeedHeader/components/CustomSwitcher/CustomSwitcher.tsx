import React, {ReactNode, useMemo} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {DropdownArrow} from '../../../../icons/DropdownArrow';

import {block} from '../../../../utils/cn';

import './CustomSwitcher.scss';

const b = block('feed-custom-switcher');

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
const ONLY_ONE_INVALID_FILTER_PROVIDED = '-';

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
        if (itemsNames.length) {
            return <CustomSwitcherView items={itemsNames} />;
        }

        return <CustomSwitcherView items={[ONLY_ONE_INVALID_FILTER_PROVIDED]} />;
    }

    return <CustomSwitcherView items={[defaultLabel]} />;
};
