import * as React from 'react';

import {Button} from '@gravity-ui/uikit';

import {editorCn} from '../../utils/cn';

import './Tabs.scss';

const b = editorCn('tabs');

export interface TabItemProps {
    id: string;
    title: string;
    component: React.ElementType;
    withPadding?: boolean;
}

export interface TabsProps {
    className?: string;
    items: TabItemProps[];
    defaultTab?: string | null;
}

const Tabs = ({className, items, defaultTab}: TabsProps) => {
    const [currentTab, setCurrentTab] = React.useState(defaultTab);

    const activeTab = React.useMemo(() => {
        if (currentTab) {
            const findTab = items.find(({id}) => id === currentTab);
            if (findTab) {
                return findTab;
            }
        }

        return items[0] || null;
    }, [currentTab, items]);

    const handleClick = React.useCallback(
        (tabItem: TabItemProps) => () => {
            setCurrentTab(tabItem.id);
        },
        [],
    );

    return (
        <div className={b(null, className)}>
            {items.length > 1 && (
                <div className={b('tabs-wrapper')} role="tablist">
                    {items.map((item) => {
                        const isActive = item.id === activeTab.id;

                        return (
                            <Button
                                view="flat"
                                size="s"
                                className={b('item', {active: isActive})}
                                key={item.id}
                                extraProps={{
                                    role: 'tab',
                                }}
                                onClick={handleClick(item)}
                            >
                                {item.title}
                            </Button>
                        );
                    })}
                </div>
            )}
            <div className={b('body')}>
                {items.map((item) => {
                    const isActive = item.id === activeTab.id;
                    const TabComponent = item.component;
                    return (
                        <div key={item.id} className={b('panel')} hidden={!isActive}>
                            <TabComponent
                                className={b('item', {padding: item.withPadding || false})}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tabs;
