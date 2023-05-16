import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {BlockIdContext} from '../../../src/context/blockIdContext';
import {PreviewClose} from '../../../src/icons';
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

    console.log('ID', blockId, useContext(BlockIdContext));
    if (!editor) {
        return <Fragment>{children}</Fragment>;
    }

    const {activeBlockId, onDelete, onSelect} = editor;
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
                    <div className={b('controlls-content')}>
                        <div className={b('delete')} onClick={() => onDelete(blockId)}>
                            <Icon size={32} data={PreviewClose} />
                        </div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default BlockBaseEdit;
