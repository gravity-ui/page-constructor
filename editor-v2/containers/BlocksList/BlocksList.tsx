import {Magnifier, SquareBars} from '@gravity-ui/icons';
import {Card, Icon, TextInput} from '@gravity-ui/uikit';
import * as React from 'react';

import {ItemConfig} from '../../../common/types';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './BlocksList.scss';

const b = editorCn('blocks-list');

interface BlockGroups {
    [key: string]: ItemConfig[];
}

const BlocksList = () => {
    const {blocks, enableInsertMode} = useMainEditorStore();
    const [search, setSearch] = React.useState('');

    const onMouseDown = React.useCallback(
        (blockType: string) => {
            enableInsertMode(blockType);
        },
        [enableInsertMode],
    );

    const groups = React.useMemo(() => {
        return blocks.reduce<BlockGroups>((acc, currentBlock) => {
            const group = currentBlock.schema.group;
            if (search && currentBlock.type.indexOf(search) === -1) {
                return acc;
            }
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
        }, {} as BlockGroups);
    }, [blocks, search]);

    return (
        <div className={b()}>
            <div className={b('search')}>
                <TextInput
                    hasClear
                    placeholder="Search block"
                    onUpdate={setSearch}
                    value={search}
                    startContent={<Icon className={b('search-icon')} data={Magnifier} />}
                />
            </div>
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
