import React, {LegacyRef, useMemo} from 'react';

import {Icon, SelectProps} from '@gravity-ui/uikit';

import {DropdownArrow} from '../../../../icons/DropdownArrow';

import {block} from '../../../../utils/cn';

import {SelectItem} from '../Controls/Controls';

import './CustomSwitcher.scss';

const b = block('feed-custom-switcher');

type RenderControlParameters = Partial<Parameters<Required<SelectProps>['renderControl']>[0]>;

export type CustomSwitcherProps = {
    initial: (string | number | null)[];
    defaultLabel: string;
    list: SelectItem[];
    controlRef: RenderControlParameters['ref'];
} & Omit<RenderControlParameters, 'ref'>;

const ICON_SIZE = 12;

export const CustomSwitcher = ({
    initial,
    defaultLabel,
    list,
    onClick,
    controlRef,
}: CustomSwitcherProps) => {
    const itemsNames = useMemo(() => {
        const items = list
            .filter((item) => initial.includes(item.value))
            .map((item) => item.content);

        return items.length ? items : [defaultLabel];
    }, [defaultLabel, initial, list]);
    const hasCounter = itemsNames.length > 1;

    return (
        <div
            className={b('custom-switcher')}
            onClick={onClick}
            ref={controlRef as LegacyRef<HTMLDivElement>}
        >
            <div className={b('custom-switcher-element', {content: true})}>
                {itemsNames?.join(', ')}
            </div>
            {hasCounter && (
                <div className={b('custom-switcher-element', {counter: true})}>
                    {itemsNames.length}
                </div>
            )}
            <div className={b('custom-switcher-element', {arrow: true})}>
                <Icon data={DropdownArrow} size={ICON_SIZE} className={b('switcher-arrow')} />
            </div>
        </div>
    );
};
