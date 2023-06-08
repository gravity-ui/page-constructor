import React, {memo, useMemo} from 'react';

import {DynamicField, Spec} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {Block, PageContent} from '../../../models';
import {block, getBlockKey} from '../../../utils';
import {dynamicConfig} from '../../dynamic-forms-custom/config';
import {CustomSpec, FormSpecs} from '../../dynamic-forms-custom/parser/types';

import './Form.scss';

const b = block('editor-form');

export interface FormProps {
    content: PageContent;
    activeBlockIndex: number;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
    spec: FormSpecs;
}

interface BlockFormProps {
    data: Block;
    spec: CustomSpec;
    onChange: (data: Block) => void;
    onSelect: () => void;
    active?: boolean;
}

export const BlockForm = memo(
    ({data: {type, ...content}, onChange, onSelect, active, spec: specRaw}: BlockFormProps) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const initialValues = useMemo(() => ({content}), []);
        const spec = useMemo(
            () => ({
                ...specRaw,
                viewSpec: {
                    ...specRaw.viewSpec,
                    layoutOpen: active,
                },
            }),
            [specRaw, active],
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
