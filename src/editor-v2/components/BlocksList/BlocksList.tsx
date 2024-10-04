import React, {PropsWithChildren, useCallback} from 'react';

import {Card} from '@gravity-ui/uikit';

import {ActionTypes, ItemConfig} from '../../../common/types';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig';
import {useMessageSender} from '../../context/messagesContext';

import './BlocksList.scss';

const b = block('blocks-list');

export interface BlocksListProps {
    blocks: ItemConfig[];
}

const BlocksList = (_p: PropsWithChildren<BlocksListProps>) => {
    const {blocks} = useContentConfigStore();
    const sendMessage = useMessageSender();

    const onMouseDown = useCallback(
        (blockType: string) => {
            sendMessage({type: ActionTypes.InsertModeEnable, payload: {blockType}});
        },
        [sendMessage],
    );

    return (
        <div className={b()}>
            <div className={b('section')}>
                <div className={b('title')}>Blocks</div>
                {blocks.map(({type, schema: {name}}) => (
                    <Card key={type} className={b('card')} onMouseDown={() => onMouseDown(type)}>
                        {name}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BlocksList;
