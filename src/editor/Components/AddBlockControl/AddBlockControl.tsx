import React, {PropsWithChildren, useRef, useState} from 'react';

import {Plus} from '@gravity-ui/icons';
import {Popup} from '@gravity-ui/uikit';

import {blockMap} from '../../../../src/constructor-items';
import {formatBlockName} from '../../../../src/editor/utils';
import {Block, BlockType} from '../../../../src/models';
import {block} from '../../../utils';
import {EdiorBlocksData} from '../../data';

import './AddBlockControl.scss';

const b = block('add-block-control');

export interface AddBlockControlProps {
    onAdd: (data: Block) => void;
}

const sortedBlockNames = Object.keys(blockMap).sort();

const AddBlockControl = ({onAdd}: PropsWithChildren<AddBlockControlProps>) => {
    const [isOpened, setIsOpened] = useState(false);
    const ref = useRef(null);

    return (
        <div className={b()} ref={ref}>
            <button className={b('button')} onClick={() => setIsOpened(!isOpened)}>
                <Plus className={b('icon')} />
            </button>
            {isOpened && (
                <Popup
                    anchorRef={ref}
                    open={isOpened}
                    className={b('popup')}
                    placement="top"
                    offset={[0, 24]}
                >
                    <div className={b('blocks')}>
                        {sortedBlockNames.map((blockName) => {
                            const blockData = EdiorBlocksData[blockName as BlockType];
                            const Preview = blockData?.preview as React.FC<
                                React.SVGProps<SVGSVGElement>
                            >;

                            return (
                                <div
                                    key={blockName}
                                    className={b('block')}
                                    onClick={() => {
                                        onAdd(blockData?.template as Block);
                                        setIsOpened(false);
                                    }}
                                >
                                    <div className={b('preview')}>
                                        <Preview />
                                    </div>
                                    <div className={b('info')}>
                                        <h4 className={b('title')}>
                                            {blockData?.meta?.title || formatBlockName(blockName)}
                                        </h4>
                                        {blockData?.meta?.description && (
                                            <p className={b('description')}>
                                                {blockData.meta.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default AddBlockControl;
