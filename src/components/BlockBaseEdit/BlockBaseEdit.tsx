import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {BlockIdContext} from '../../../src/context/blockIdContext';
import {PreviewClose} from '../../../src/icons';
import {InnerContext} from '../../context/innerContext';
import {block} from '../../utils';

import './BlockBaseEdit.scss';

const b = block('block-base-edit');

const getBlockId = (blockId?: string) => Number(blockId?.split('-')?.at(-1));

const BlockBaseEdit = ({children}: PropsWithChildren<{}>) => {
    const {editor} = useContext(InnerContext);
    const blockId = getBlockId(useContext(BlockIdContext));

    if (!editor) {
        return <Fragment>{children}</Fragment>;
    }

    const {activeBlockId, onDelete, onSelect} = editor;

    return (
        <div className={b()} onClick={() => onSelect(blockId)}>
            <div className={b('controls', {visible: blockId === activeBlockId})}>
                <div className={b('delete')} onClick={() => onDelete(blockId)}>
                    <Icon size={24} data={PreviewClose} />
                </div>
            </div>
            {children}
        </div>
    );
};

export default BlockBaseEdit;
