import React, {memo} from 'react';

import _ from 'lodash';

import {Block, PageContent} from '../../../models';
import {getBlockKey} from '../../../utils';
import {BlockForm} from '../../components/BlockForm/BlockForm';
import {FormSpecs} from '../../dynamic-forms-custom/parser/types';

export interface FormProps {
    content: PageContent;
    activeBlockIndex: number;
    spec: FormSpecs;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
}

export const Form = memo(({content, onChange, activeBlockIndex, onSelect, spec}: FormProps) => {
    const blocks = content?.blocks || [];

    return (
        <div>
            {blocks.map((blockData, index) => (
                <BlockForm
                    spec={spec[blockData.type]}
                    key={getBlockKey(blockData, index)}
                    data={blockData}
                    active={activeBlockIndex === index}
                    onChange={(data: Block) => {
                        onChange({
                            ...content,
                            blocks: [...blocks.slice(0, index), data, ...blocks.slice(index + 1)],
                        });
                    }}
                    onSelect={() => onSelect(index)}
                />
            ))}
        </div>
    );
});

Form.displayName = 'Form';
