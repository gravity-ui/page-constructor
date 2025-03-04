import {Button} from '@gravity-ui/uikit';
import React, {ElementType, useCallback, useMemo, useState} from 'react';

import {editorCn} from '../../utils/cn';

import './Tabs.scss';

const b = editorCn('tabs');

export interface TabsItemProps {
    id: string;
    title: string;
    component: ElementType;
}

export interface TabsProps {
    className?: string;
    items: TabsItemProps[];
    defaultTab?: string | null;
}

const Tabs = ({className, items, defaultTab}: TabsProps) => {
    const [currentTab, setCurrentTab] = useState(defaultTab);

    const activeTabId: string | null = useMemo(() => {
        if (currentTab) {
            return currentTab;
        }

        return items[0].id;
    }, [currentTab, items]);

    const handleClick = useCallback(
        (tabId: string) => () => {
            setCurrentTab(tabId);
        },
        [],
    );

    const TabComponent = useMemo(() => {
        const findTab = items.find(({id}) => id === activeTabId);
        return findTab?.component;
    }, [activeTabId, items]);

    return (
        <div className={b(null, className)}>
            <div className={b('tabs-wrapper')} role="tablist">
                {items.map(({id, title}) => {
                    const isActive = id === activeTabId;

                    return (
                        <Button
                            view="flat"
                            size="s"
                            className={b('item', {active: isActive})}
                            key={title}
                            extraProps={{
                                role: 'tab',
                            }}
                            onClick={handleClick(id)}
                        >
                            {title}
                        </Button>
                    );
                })}
            </div>
            <div className={b('body')}>{TabComponent && <TabComponent />}</div>
        </div>
    );
};

export default Tabs;
