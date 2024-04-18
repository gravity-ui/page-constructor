import React, {useMemo} from 'react';

import {DynamicField, Spec} from '@gravity-ui/dynamic-forms';
import {Disclosure} from '@gravity-ui/uikit';
import {JSONSchema4} from 'json-schema';
import noop from 'lodash/noop';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {PageContent} from '../../../models';
import {block} from '../../../utils';
import {dynamicConfig} from '../../dynamic-forms-custom/config';
import useFormSpec from '../../hooks/useFormSpec';

import {i18n} from './i18n';

import './PageSettings.scss';

const b = block('editor-page-settings');

export interface PageSettingsProps {
    content: PageContent;
    schema: JSONSchema4;
    onChange: (content: PageContent) => void;
}

export const PageSettings = ({schema, content, onChange}: PageSettingsProps) => {
    const spec = useFormSpec(schema);
    const {page: pageSpec} = spec || {};

    const initialPage = useMemo(() => {
        const {blocks: _, ...page} = content || {};

        return page;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Disclosure className={b('container')} summary={i18n('page-settings-title')} size="l">
            <div className={b('form')}>
                <FinalForm initialValues={{content: initialPage}} onSubmit={noop}>
                    {() => (
                        <div>
                            <FormSpy
                                onChange={({values}) => onChange({...content, ...values.content})}
                                subscription={{values: true}}
                            />
                            <DynamicField
                                name="content"
                                spec={pageSpec as Spec}
                                config={dynamicConfig}
                            />
                        </div>
                    )}
                </FinalForm>
            </div>
        </Disclosure>
    );
};

PageSettings.displayName = 'PageSettings';
