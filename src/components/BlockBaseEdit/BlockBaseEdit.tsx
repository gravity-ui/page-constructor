import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';

import {BlockIdContext} from '../../../src/context/blockIdContext';
import {InnerContext} from '../../context/innerContext';
import {block} from '../../utils';

import './BlockBaseEdit.scss';

const b = block('block-base-edit');

export interface BlockBaseEditProps {
    id?: string;
}

const getBlockId = (blockId?: string) => Number(blockId?.split('-')?.at(-1));

const BlockBaseEdit = ({children, id}: PropsWithChildren<BlockBaseEditProps>) => {
    const {editor} = useContext(InnerContext);
    const blockContenxtId = getBlockId(useContext(BlockIdContext));
    const blockId = id || blockContenxtId;

    if (!editor) {
        return <Fragment>{children}</Fragment>;
    }

    const {activeBlockId, onDelete, onSelect, onCopy, onOrderChange} = editor;
    const controlsActive = blockId === activeBlockId;

    return (
        <div
            className={b()}
            onClick={() => {
                onSelect(blockId);
            }}
        >
            <div className={b('controls', {active: controlsActive})}>
                {controlsActive && (
                    <div className={b('controls-content')}>
                        {typeof blockId === 'number' && (
                            <Fragment>
                                {blockId > 0 && (
                                    <div
                                        className={b('control')}
                                        onClick={() => onOrderChange(blockId, blockId - 1)}
                                    >
                                        <ChevronUp />
                                    </div>
                                )}
                                {blockId < editor.blocksCount - 1 && (
                                    <div
                                        className={b('control')}
                                        onClick={() => onOrderChange(blockId, blockId + 1)}
                                    >
                                        <ChevronDown />
                                    </div>
                                )}
                                <div className={b('control')} onClick={() => onCopy(blockId)}>
                                    <Copy />
                                </div>
                            </Fragment>
                        )}
                        <div className={b('control')} onClick={() => onDelete(blockId)}>
                            <TrashBin />
                        </div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default BlockBaseEdit;
