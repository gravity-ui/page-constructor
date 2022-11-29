import React, {useCallback, useMemo} from 'react';
import {block} from '../../utils';

// import {MobileContext} from '../../context/mobileContext';
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
}

const ButtonTabs = (props: ButtonTabsProps) => {
    const {className, items, activeTab, onSelectTab} = props;

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
            {items.map((item) => {
                const isActive = item.id === activeTabId;

                return (
                    <Button
                        text={item.title}
                        className={b('item', {active: isActive})}
                        key={item.title}
                        size={'l'}
                        onClick={() => handleClick(item.id)}
                        theme={isActive ? 'monochrome' : 'normal'}
                    />
                );
            })}
        </div>
    );
};

export default ButtonTabs;
