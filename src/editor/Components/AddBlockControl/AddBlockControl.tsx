import React, {PropsWithChildren, useMemo, useRef, useState} from 'react';

import {Plus} from '@gravity-ui/icons';
import {Popup, TextInput} from '@gravity-ui/uikit';

import {blockMap} from '../../../constructor-items';
import {Block, BlockType} from '../../../models';
import {block} from '../../../utils';
import EdiorBlocksData from '../../data';

import './AddBlockControl.scss';

const b = block('add-block-control');

export interface AddBlockControlProps {
    onAdd: (data: Block) => void;
}

const sortedBlockNames = Object.keys(blockMap).sort();

const AddBlockControl = ({onAdd}: PropsWithChildren<AddBlockControlProps>) => {
    const [isOpened, setIsOpened] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);
    const blocks = useMemo(
        () =>
            sortedBlockNames.filter((blockName) =>
                EdiorBlocksData[blockName as BlockType].meta.title
                    .toLocaleLowerCase()
                    .startsWith(search.toLocaleLowerCase()),
            ),
        [search],
    );

    return (
        <div className={b()} ref={ref}>
            <button
                className={b('button')}
                onClick={() => {
                    setIsOpened(!isOpened);
                    setSearch('');
                }}
            >
                <Plus className={b('icon')} />
            </button>
            {isOpened && (
                <Popup
                    anchorRef={ref}
                    open={isOpened}
                    className={b('popup')}
                    placement="top"
                    offset={[0, 24]}
                    onOutsideClick={() => setIsOpened(false)}
                >
                    <div className={b('search')}>
                        <TextInput
                            placeholder="search"
                            type="text"
                            value={search}
                            size="l"
                            onUpdate={(value) => setSearch(value)}
                        />
                    </div>
                    <div className={b('blocks')}>
                        {blocks.map((blockName) => {
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
                                        <h4 className={b('title')}>{blockData.meta.title}</h4>
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
