import React, {useMemo, useState} from 'react';

import {Code, FolderTree, Gear, Rectangles4, Square} from '@gravity-ui/icons';
import {Button, Icon, Label} from '@gravity-ui/uikit';
import {IconData} from '@gravity-ui/uikit/build/esm/components/Icon/Icon';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import BlockConfig from '../BlockConfig/BlockConfig';
import BlocksList from '../BlocksList/BlocksList';
import GlobalConfig from '../GlobalConfig/GlobalConfig';
import SourceCode from '../SourceCode/SourceCode';
import Tree from '../Tree/Tree';

import './Sidebar.scss';

const b = block('sidebar');

interface SidebarProps extends ClassNameProps {
    position: 'left' | 'right';
    startMenu?: string;
}

interface TabConfig {
    id: string;
    name: string;
    icon: IconData;
    component: React.ElementType;
    position: 'left' | 'right' | 'both';
}

export const Sidebar = ({className, position, startMenu}: SidebarProps) => {
    const [currentTab, setCurrentTab] = useState(startMenu || 'blocks-list');

    const defaultTabs: TabConfig[] = useMemo(
        () => [
            {
                id: 'blocks-list',
                name: 'Блоки',
                icon: Rectangles4,
                component: BlocksList,
                position: 'left',
            },
            {
                id: 'global-config',
                name: 'Глобальная конфигурация',
                icon: Gear,
                component: GlobalConfig,
                position: 'left',
            },
            {
                id: 'tree',
                name: 'Дерево',
                icon: FolderTree,
                component: Tree,
                position: 'left',
            },
            {
                id: 'block-config',
                name: 'Конфигурация блока',
                icon: Square,
                component: BlockConfig,
                position: 'right',
            },
            {
                id: 'source-code',
                name: 'Исходный код',
                icon: Code,
                component: SourceCode,
                position: 'both',
            },
        ],
        [],
    );

    const filteredTabs = defaultTabs.filter(
        ({position: tabPosition}) => tabPosition === 'both' || tabPosition === position,
    );

    const TabComponent = useMemo(() => {
        const findTab = defaultTabs.find(({id}) => id === currentTab);
        return findTab?.component;
    }, [currentTab, defaultTabs]);

    return (
        <div className={`${b(null, className)} ${b('', {position})}`}>
            <div className={b('buttons-wrapper')}>
                <div className={b('buttons')}>
                    {filteredTabs.map(({id, icon, name}) => (
                        <div className={b('button-wrapper')} key={id}>
                            <Button
                                view={currentTab === id ? 'action' : 'flat'}
                                size="m"
                                onClick={() => setCurrentTab(id)}
                            >
                                <Icon data={icon} size={18} />
                            </Button>
                            <div className={b('label-wrapper')}>
                                <Label theme={'normal'} size={'m'}>
                                    {name}
                                </Label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={b('body')}>{TabComponent && <TabComponent />}</div>
        </div>
    );
};
