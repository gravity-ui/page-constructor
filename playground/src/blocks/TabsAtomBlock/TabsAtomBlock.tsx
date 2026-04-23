import * as React from 'react';

import {Tab, TabList, TabPanel, TabProvider} from '@gravity-ui/uikit';

export interface TabsAtomItem {
    title: string;
    content: string;
}

export interface TabsAtomBlockProps {
    items?: TabsAtomItem[];
    size?: 'm' | 'l' | 'xl';
}

const TabsAtomBlock: React.FC<TabsAtomBlockProps> = ({items = [], size = 'm'}) => {
    const [activeTab, setActiveTab] = React.useState(() => items[0]?.title ?? '');

    React.useEffect(() => {
        if (items.length > 0 && !items.find((i) => i.title === activeTab)) {
            setActiveTab(items[0].title);
        }
    }, [items, activeTab]);

    if (items.length === 0) return null;

    return (
        <div style={{padding: '16px 24px'}}>
            <TabProvider value={activeTab} onUpdate={setActiveTab}>
                <TabList size={size}>
                    {items.map((item) => (
                        <Tab key={item.title} value={item.title}>
                            {item.title}
                        </Tab>
                    ))}
                </TabList>
                {items.map((item) => (
                    <TabPanel key={item.title} value={item.title}>
                        <div style={{padding: '16px 0', color: 'var(--g-color-text-primary)'}}>
                            {item.content}
                        </div>
                    </TabPanel>
                ))}
            </TabProvider>
        </div>
    );
};

export default TabsAtomBlock;
