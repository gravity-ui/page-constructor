import React, {memo, useMemo} from 'react';

import {DynamicField, Spec} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {dynamicConfig} from '../../../editor/form/config';
import {Block, PageContent} from '../../../models';
import {block, getBlockKey} from '../../../utils';
import {blockSpecs} from '../../utils/form';

import './Form.scss';

const b = block('editor-form');

export interface FormProps {
    content: PageContent;
    activeBlockIndex: number;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
}

interface BlockFormProps {
    data: Block;
    onChange: (data: Block) => void;
    onSelect: () => void;
    active?: boolean;
}

export const BlockForm = memo(
    ({data: {type, ...content}, onChange, onSelect, active}: BlockFormProps) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const initialValues = useMemo(() => ({content}), []);
        const spec = useMemo(
            () => ({
                ...blockSpecs[type],
                viewSpec: {
                    ...blockSpecs[type].viewSpec,
                    layoutOpen: active,
                },
            }),
            [type, active],
        );

        return (
            <div className={b()}>
                <FinalForm initialValues={initialValues} onSubmit={_.noop}>
                    {() => (
                        <div
                            onClick={() => {
                                if (!active) {
                                    onSelect();
                                }
                            }}
                        >
                            <FormSpy
                                key={type}
                                onChange={({values}) => onChange({type, ...values.content})}
                                subscription={{values: true}}
                            />
                            <DynamicField
                                name="content"
                                // there is no way other way to manage with form open/close state now
                                key={String(active)}
                                spec={spec as Spec}
                                config={dynamicConfig}
                            />
                        </div>
                    )}
                </FinalForm>
            </div>
        );
    },
);

BlockForm.displayName = 'BlockForm';

export const Form = memo(({content, onChange, activeBlockIndex, onSelect}: FormProps) => {
    const blocks = content?.blocks || [];

    return (
        <div>
            {blocks.map((blockData, index) => (
                <BlockForm
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
