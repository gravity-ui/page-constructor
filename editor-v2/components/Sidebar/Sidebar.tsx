import * as React from 'react';

import {editorCn} from '../../utils/cn';
import Tabs, {TabsItemProps} from '../Tabs/Tabs';

import './Sidebar.scss';

const b = editorCn('sidebar');

interface SidebarProps {
    tabs: TabsItemProps[];
    defaultTab?: string;
    top?: React.ElementType[];
    className?: string;
}

export const Sidebar = ({className, tabs, top = []}: SidebarProps) => {
    return (
        <div className={b(null, className)}>
            {top.map((TopComponent, idx) => (
                <div key={idx} className={b('block')}>
                    <TopComponent />
                </div>
            ))}
            <Tabs items={tabs} />
        </div>
    );
};
