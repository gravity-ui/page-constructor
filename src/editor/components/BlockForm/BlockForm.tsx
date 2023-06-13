import React, {memo, useMemo} from 'react';

import {DynamicField, Spec} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {Block} from '../../../models';
import {dynamicConfig} from '../../dynamic-forms-custom/config';
import {CustomSpec} from '../../dynamic-forms-custom/parser/types';

interface BlockFormProps {
    data: Block;
    spec: CustomSpec;
    onChange: (data: Block) => void;
    onSelect: () => void;
    active?: boolean;
}

export const BlockForm = memo(
    ({data: {type, ...content}, onChange, onSelect, active, spec: specRaw}: BlockFormProps) => {
        // get initial values only at first render, then the form manages data
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
        );
    },
);

BlockForm.displayName = 'BlockForm';
