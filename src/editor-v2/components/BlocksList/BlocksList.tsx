import React, {PropsWithChildren, useCallback} from 'react';

import {Grip, Plus} from '@gravity-ui/icons';
import {Button, Card, Icon} from '@gravity-ui/uikit';
import _ from 'lodash';

import {ActionTypes, ItemConfig} from '../../../common/types';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig';
import {useEditorStore} from '../../context/editorContext';
import {useMessageSender} from '../../context/messagesContext';

import './BlocksList.scss';

const b = block('blocks-list');

export interface BlocksListProps {
    blocks: ItemConfig[];
}

interface BlockGroups {
    [key: string]: ItemConfig[];
}

const BlocksList = (_p: PropsWithChildren<BlocksListProps>) => {
    const {blocks, insertBlock} = useContentConfigStore();
    const {selectedBlock} = useEditorStore();
    const sendMessage = useMessageSender();

    const onMouseDown = useCallback(
        (blockType: string) => {
            sendMessage({type: ActionTypes.InsertModeEnable, payload: {blockType}});
        },
        [sendMessage],
    );

    const onAddClick = useCallback(
        (type: string) => {
            const path = selectedBlock ? selectedBlock.path : [0];
            return insertBlock(path, type);
        },
        [insertBlock, selectedBlock],
    );

    const groups = blocks.reduce<BlockGroups>((acc, currentBlock) => {
        const group = currentBlock.schema.group;
        if (group) {
            if (!acc[group]) {
                /* eslint-disable no-param-reassign */
                acc[group] = [];
            }
            acc[group].push(currentBlock);
        } else {
            if (!acc['other']) {
                /* eslint-disable no-param-reassign */
                acc['other'] = [];
            }
            acc['other'].push(currentBlock);
        }

        return acc;
    }, {});

    return (
        <div className={b()}>
            <div className={b('section')}>
                <div className={b('title')}>Blocks</div>
                {Object.entries(groups).map(([key, groupBlocks]) => (
                    <div className={b('group')} key={key}>
                        <div className={b('subtitle')}>{_.capitalize(key)}</div>
                        <div>
                            {groupBlocks.map(({type, schema: {name}}) => (
                                <Card
                                    key={type}
                                    className={b('card')}
                                    onMouseDown={() => onMouseDown(type)}
                                >
                                    <Icon data={Grip} />
                                    <div className={b('name')}>{name}</div>
                                    <Button onClick={() => onAddClick(type)}>
                                        <Icon data={Plus} />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlocksList;
