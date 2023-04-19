import React, {useCallback, useMemo} from 'react';

import {ButtonSize} from '@gravity-ui/uikit';

import {ButtonProps} from '../../models';
import {block} from '../../utils';
import {Button} from '../index';

import './ButtonTabs.scss';

const b = block('button-tabs');

export interface ButtonTabsItemProps
    extends Omit<ButtonProps, 'url' | 'primary' | 'target' | 'text'> {
    id: string | null;
    title: string;
}

export interface ButtonTabsProps {
    className?: string;
    items: ButtonTabsItemProps[];
    activeTab?: string | null;
    onSelectTab?: (
        tabId: string | null,
        e: Parameters<React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>>[number],
    ) => void;
    tabSize?: ButtonSize;
    qa?: string;
}

const ButtonTabs: React.FC<ButtonTabsProps> = ({
    className,
    items,
    activeTab,
    onSelectTab,
    tabSize = 'l',
    qa,
}) => {
    const activeTabId: string | null = useMemo(() => {
        if (activeTab) {
            return activeTab;
        }

        return items[0].id;
    }, [activeTab, items]);

    const handleClick = useCallback(
        (tabId: string | null) =>
            (
                e: Parameters<
                    React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
                >[number],
            ) => {
                if (onSelectTab) {
                    onSelectTab(tabId, e);
                }
            },
        [onSelectTab],
    );

    return (
        <div className={b(null, className)} data-qa={qa}>
            {items.map(({id, title}) => (
                <Button
                    text={title}
                    className={b('item', {active: id === activeTabId})}
                    key={title}
                    size={tabSize}
                    onClick={handleClick(id)}
                />
            ))}
        </div>
    );
};

export default ButtonTabs;
