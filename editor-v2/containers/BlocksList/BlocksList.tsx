import {SquareBars} from '@gravity-ui/icons';
import {Card, Icon} from '@gravity-ui/uikit';
import _ from 'lodash';
import React, {PropsWithChildren, useCallback} from 'react';

import {ItemConfig} from '../../../common/types';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './BlocksList.scss';

const b = editorCn('blocks-list');

export interface BlocksListProps {
    blocks: ItemConfig[];
}

interface BlockGroups {
    [key: string]: ItemConfig[];
}

const BlocksList = (_p: PropsWithChildren<BlocksListProps>) => {
    const {blocks, enableInsertMode} = useMainEditorStore();

    const onMouseDown = useCallback(
        (blockType: string) => {
            enableInsertMode(blockType);
        },
        [enableInsertMode],
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
            {Object.entries(groups).map(([key, groupBlocks]) => (
                <div className={b('group')} key={key}>
                    <div className={b('title')}>{key}</div>
                    <div className={b('group-items')}>
                        {groupBlocks.map(({type, schema: {name, previewImg}}) => (
                            <Card
                                key={type}
                                className={b('card')}
                                onMouseDown={() => onMouseDown(type)}
                            >
                                <div>
                                    {previewImg ? (
                                        <img src={previewImg} alt="" />
                                    ) : (
                                        <Icon className={b('icon')} size={45} data={SquareBars} />
                                    )}
                                </div>
                                <div className={b('name')}>{name}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlocksList;
