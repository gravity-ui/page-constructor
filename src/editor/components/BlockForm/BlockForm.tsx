import React, {memo, useMemo} from 'react';

import {DynamicField, SimpleVerticalAccordeon, Spec} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {Block} from '../../../models';
import {dynamicConfig} from '../../dynamic-forms-custom/config';
import {CustomSpec} from '../../dynamic-forms-custom/parser/types';
import usePreviousValue from '../../hooks/usePreviousValue';

interface BlockFormProps {
    data: Block;
    spec: CustomSpec;
    onChange: (data: Block) => void;
    onSelect: () => void;
    active?: boolean;
}

export const BlockForm = memo(
    ({data: {type, ...content}, onChange, onSelect, active, spec: specRaw}: BlockFormProps) => {
        const initialValues = useMemo(() => ({content}), [content]);
        const prevContent = usePreviousValue(content);
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

        if (!active) {
            return (
                <SimpleVerticalAccordeon
                    open={false}
                    name={type}
                    title={spec.viewSpec.layoutTitle || type}
                    onOpenChange={onSelect}
                >
                    {/* SimpleVerticalAccordeon requires children, put dummy value*/}
                    {1}
                </SimpleVerticalAccordeon>
            );
        }

        return (
            <FinalForm initialValues={initialValues} onSubmit={_.noop}>
                {() => (
                    <div>
                        <FormSpy
                            onChange={({values}) => {
                                // fix for FormSpy onChange called twice without content changes
                                if (!_.isEqual(values.content, prevContent)) {
                                    onChange({type, ...values.content});
                                }
                            }}
                            subscription={{values: true}}
                        />
                        <DynamicField
                            name="content"
                            spec={spec as Spec}
                            config={dynamicConfig}
                            withoutInsertFFDebounce
                        />
                    </div>
                )}
            </FinalForm>
        );
    },
);

BlockForm.displayName = 'BlockForm';
