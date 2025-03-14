import * as React from 'react';

import {ButtonSize} from '@gravity-ui/uikit';

import {ButtonProps, QAProps} from '../../models';
import {block} from '../../utils';
import {Button} from '../index';

import './ButtonTabs.scss';

const b = block('button-tabs');

export interface ButtonTabsItemProps
    extends Omit<ButtonProps, 'url' | 'primary' | 'target' | 'text'> {
    id: string | null;
    title: string;
}

export interface ButtonTabsProps extends QAProps {
    className?: string;
    items: ButtonTabsItemProps[];
    activeTab?: string | null;
    onSelectTab?: (
        tabId: string | null,
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => void;
    tabSize?: ButtonSize;
    getTabElementId?: (tabId: string) => string;
    getTabContentElementId?: (tabId: string) => string;
}

const ButtonTabs: React.FC<ButtonTabsProps> = ({
    className,
    items,
    activeTab,
    onSelectTab,
    tabSize = 'l',
    qa,
    getTabElementId,
    getTabContentElementId,
}) => {
    const activeTabId: string | null = React.useMemo(() => {
        if (activeTab) {
            return activeTab;
        }

        return items[0].id;
    }, [activeTab, items]);

    const handleClick = React.useCallback(
        (tabId: string | null) => (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            if (onSelectTab) {
                onSelectTab(tabId, e);
            }
        },
        [onSelectTab],
    );

    return (
        <div className={b(null, className)} role="tablist" data-qa={qa}>
            {items.map(({id, title}) => {
                const isActive = id === activeTabId;

                return (
                    <Button
                        text={title}
                        className={b('item', {active: isActive})}
                        key={title}
                        size={tabSize}
                        onClick={handleClick(id)}
                        id={getTabElementId?.(id ?? '')}
                        extraProps={{
                            role: 'tab',
                            'aria-selected': isActive,
                            'aria-controls': getTabContentElementId?.(id ?? ''),
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ButtonTabs;
