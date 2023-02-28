import React, {useCallback, useMemo} from 'react';
import {ButtonSize} from '@gravity-ui/uikit';

import {block} from '../../utils';
import {ButtonProps} from '../../models';
import {Button} from '../index';

import './ButtonTabs.scss';

const b = block('button-tabs');

export interface ButtonTabsItemProps
    extends Omit<ButtonProps, 'url' | 'primary' | 'target' | 'text'> {
    id: string;
    title: string;
}

export interface ButtonTabsProps {
    className?: string;
    items: ButtonTabsItemProps[];
    activeTab?: string;
    onSelectTab?: (tabId: string) => void;
    tabSize?: ButtonSize;
}

const ButtonTabs: React.FC<ButtonTabsProps> = ({
    className,
    items,
    activeTab,
    onSelectTab,
    tabSize = 'l',
}) => {
    const activeTabId: string = useMemo(() => {
        if (activeTab) {
            return activeTab;
        }

        return items[0].id;
    }, [activeTab, items]);

    const handleClick = useCallback(
        (tabId: string) => {
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
                    className={b('item')}
                    key={title}
                    size={tabSize}
                    onClick={() => handleClick(id)}
                    selected={id === activeTabId}
                />
            ))}
        </div>
    );
};

export default ButtonTabs;
