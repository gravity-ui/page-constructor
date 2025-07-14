import {ChevronDown, ChevronRight, Folder, FolderOpen, Magnifier} from '@gravity-ui/icons';
import {DropdownMenu, Icon, TextInput} from '@gravity-ui/uikit';
import * as React from 'react';

import {ItemConfig} from '../../../common/types';
import {ClassNameProps} from '../../../models';
import BlockCard from '../../components/BlockCard/BlockCard';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './BlocksList.scss';

const b = editorCn('blocks-list');

interface BlockGroups {
    [key: string]: ItemConfig[];
}

interface BlockListProps extends ClassNameProps {}

const BlocksList = ({className}: BlockListProps) => {
    const {blocks, enableInsertMode} = useMainEditorStore();
    const [search, setSearch] = React.useState('');
    const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set());

    const onMouseDown = React.useCallback(
        (blockType: string) => {
            enableInsertMode(blockType);
        },
        [enableInsertMode],
    );

    const toggleGroup = React.useCallback((groupKey: string) => {
        setCollapsedGroups((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(groupKey)) {
                newSet.delete(groupKey);
            } else {
                newSet.add(groupKey);
            }
            return newSet;
        });
    }, []);

    const expandAll = React.useCallback(() => {
        setCollapsedGroups(new Set());
    }, []);

    const groups = React.useMemo(() => {
        return blocks.reduce<BlockGroups>((acc, currentBlock) => {
            const group = currentBlock.schema.group;
            if (
                search &&
                currentBlock.type.toLowerCase().indexOf(search.toLowerCase()) === -1 &&
                currentBlock.schema.name.toLowerCase().indexOf(search.toLowerCase()) === -1
            ) {
                return acc;
            }
            if (group) {
                if (!acc[group]) {
                    /* eslint-disable no-param-reassign */
                    acc[group] = [];
                }
                acc[group].push(currentBlock);
            } else {
                if (!acc['Other']) {
                    /* eslint-disable no-param-reassign */
                    acc['Other'] = [];
                }
                acc['Other'].push(currentBlock);
            }

            return acc;
        }, {} as BlockGroups);
    }, [blocks, search]);

    const collapseAll = React.useCallback(() => {
        setCollapsedGroups(new Set(Object.keys(groups)));
    }, [groups]);

    const allGroupsExpanded = collapsedGroups.size === 0;
    const allGroupsCollapsed = collapsedGroups.size === Object.keys(groups).length;

    return (
        <div className={b(null, className)}>
            <div className={b('search')}>
                <TextInput
                    size="m"
                    hasClear
                    placeholder="Search block"
                    onUpdate={setSearch}
                    value={search}
                    startContent={<Icon className={b('search-icon')} data={Magnifier} />}
                />
                <DropdownMenu
                    items={[
                        {
                            action: expandAll,
                            text: 'Раскрыть все',
                            iconStart: <Icon data={FolderOpen} />,
                            disabled: allGroupsExpanded,
                        },
                        {
                            action: collapseAll,
                            text: 'Свернуть все',
                            iconStart: <Icon data={Folder} />,
                            disabled: allGroupsCollapsed,
                        },
                    ]}
                />
            </div>
            {Object.entries(groups).map(([key, groupBlocks]) => {
                const isCollapsed = collapsedGroups.has(key);
                return (
                    <div className={b('group', {collapsed: isCollapsed})} key={key}>
                        <button
                            className={b('title')}
                            onClick={() => toggleGroup(key)}
                            type="button"
                        >
                            <Icon
                                className={b('title-icon')}
                                data={isCollapsed ? ChevronRight : ChevronDown}
                                size={14}
                            />
                            {key}
                        </button>
                        {!isCollapsed && (
                            <div className={b('group-items')}>
                                {groupBlocks.map(({type, schema: {name, previewImg}}) => (
                                    <BlockCard
                                        key={type}
                                        type={type}
                                        name={name}
                                        previewImg={previewImg}
                                        onMouseDown={onMouseDown}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BlocksList;
