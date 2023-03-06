import React, {useCallback, useMemo} from 'react';
import {ButtonSize} from '@gravity-ui/uikit';

import {block} from '../../utils';
import {ButtonProps} from '../../models';
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
    onSelectTab?: (tabId: string | null) => void;
    tabSize?: ButtonSize;
}

const ButtonTabs: React.FC<ButtonTabsProps> = ({
    className,
    items,
    activeTab,
    onSelectTab,
    tabSize = 'l',
}) => {
    const activeTabId: string | null = useMemo(() => {
        if (activeTab) {
            return activeTab;
        }

        return items[0].id;
    }, [activeTab, items]);

    const handleClick = useCallback(
        (tabId: string | null) => {
            if (onSelectTab) {
                onSelectTab(tabId);
            }
        },
        [onSelectTab],
    );

    return (
        <div className={b(null, className)}>
            {items.map(({id, title}) => (
                <Button
                    text={title}
                    className={b('item', {active: id === activeTabId})}
                    key={title}
                    size={tabSize}
                    onClick={() => handleClick(id)}
                />
            ))}
        </div>
    );
};

export default ButtonTabs;
