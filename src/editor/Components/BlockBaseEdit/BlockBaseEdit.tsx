import React, {Fragment, PropsWithChildren, useContext, useEffect, useRef} from 'react';

import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';

import {BlockIdContext} from '../../../context/blockIdContext';
import {InnerContext} from '../../../context/innerContext';
import {block} from '../../../utils';

import './BlockBaseEdit.scss';

const b = block('block-base-edit');

export interface BlockBaseEditProps {
    id?: string;
}

const getBlockId = (blockId?: string) => Number(blockId?.split('-')?.at(-1));

const BlockBaseEdit = ({children, id}: PropsWithChildren<BlockBaseEditProps>) => {
    const {editor} = useContext(InnerContext);
    const ref = useRef<HTMLDivElement>(null);
    const blockContenxtId = getBlockId(useContext(BlockIdContext));
    const blockId = id || blockContenxtId;
    const controlsActive = blockId === editor?.activeBlockId;

    useEffect(() => {
        if (controlsActive && ref.current) {
            ref.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [controlsActive]);

    if (!editor) {
        return <Fragment>{children}</Fragment>;
    }

    const {onDelete, onSelect, onCopy, onOrderChange} = editor;

    return (
        <div
            className={b()}
            onClick={() => {
                onSelect(blockId);
            }}
            ref={ref}
        >
            <div className={b('controls', {active: controlsActive})}>
                {controlsActive && (
                    <div className={b('controls-content')} onClick={(e) => e.stopPropagation()}>
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
