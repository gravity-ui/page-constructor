import * as React from 'react';

import {Card, Text} from '@gravity-ui/uikit';

import {FieldSettings} from '../../components/FieldSettings/FieldSettings';
import {useFormContext} from '../../hooks/FormContext';
import {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {findFieldById} from '../../utils/fieldTree';

import './Inspector.scss';

const b = formBuilderV2Cn('inspector');

const TYPE_LABELS: Record<FormField['type'], string> = {
    textInput: 'Text input',
    textArea: 'Text area',
    select: 'Select',
    segmentedRadioGroup: 'Segmented radio',
    switch: 'Switch',
    colorInput: 'Color input',
    text: 'Static text',
    section: 'Section',
};

export const Inspector: React.FC = () => {
    const {formFields, selectedFieldId} = useFormContext();

    const selected = React.useMemo(
        () => (selectedFieldId ? findFieldById(formFields, selectedFieldId) : null),
        [formFields, selectedFieldId],
    );

    return (
        <Card className={b()} view="outlined">
            {selected ? (
                <React.Fragment>
                    <div className={b('header')}>
                        <Text variant="subheader-2">{TYPE_LABELS[selected.type]}</Text>
                        {'name' in selected && selected.name ? (
                            <Text variant="caption-1" color="hint">
                                {selected.name}
                            </Text>
                        ) : null}
                    </div>
                    <div className={b('body')}>
                        <FieldSettings field={selected} />
                    </div>
                </React.Fragment>
            ) : (
                <div className={b('empty')}>
                    <Text variant="body-2" color="hint">
                        Select a field on the canvas to edit its settings.
                    </Text>
                </div>
            )}
        </Card>
    );
};
