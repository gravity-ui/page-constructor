import * as React from 'react';

import {TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Select, TextInput} from '@gravity-ui/uikit';

import type {When} from '../../../form-generator-v2/types';
import {formBuilderV2Cn} from '../../utils/cn';

import {
    COMBINATOR_OPTIONS,
    Combinator,
    Condition,
    OPERATOR_OPTIONS,
    coerceValue,
    displayValue,
    parse,
    serialize,
} from './utils';

import './WhenEditor.scss';

const b = formBuilderV2Cn('when-editor');

interface WhenEditorProps {
    when: When | undefined;
    availableFields: string[];
    onChange: (next: When | undefined) => void;
}

export const WhenEditor: React.FC<WhenEditorProps> = ({when, availableFields, onChange}) => {
    const {conditions, combinators} = parse(when);

    const fieldOptions = React.useMemo(
        () => availableFields.map((name) => ({value: name, content: name})),
        [availableFields],
    );

    const commit = (nextConditions: Condition[], nextCombinators: Combinator[]) => {
        onChange(serialize(nextConditions, nextCombinators));
    };

    const addCondition = () => {
        const nextConditions: Condition[] = [
            ...conditions,
            {field: availableFields[0] ?? '', operator: '===', value: ''},
        ];
        const nextCombinators: Combinator[] =
            conditions.length === 0 ? combinators : [...combinators, {operator: '&&'}];
        commit(nextConditions, nextCombinators);
    };

    const removeCondition = (index: number) => {
        const nextConditions = conditions.filter((_, i) => i !== index);
        const nextCombinators =
            index === 0
                ? combinators.slice(1)
                : [...combinators.slice(0, index - 1), ...combinators.slice(index)];
        commit(nextConditions, nextCombinators);
    };

    const updateCondition = (index: number, patch: Partial<Condition>) => {
        const nextConditions = conditions.map((c, i) => (i === index ? {...c, ...patch} : c));
        commit(nextConditions, combinators);
    };

    const updateCombinator = (index: number, op: '&&' | '||') => {
        const nextCombinators = combinators.map((c, i) => (i === index ? {operator: op} : c));
        commit(conditions, nextCombinators);
    };

    const clearAll = () => {
        onChange(undefined);
    };

    if (conditions.length === 0) {
        return (
            <div className={b()}>
                <Button view="normal" size="s" onClick={addCondition}>
                    + Add condition
                </Button>
            </div>
        );
    }

    return (
        <div className={b()}>
            {conditions.map((cond, i) => (
                <React.Fragment key={i}>
                    {i > 0 && (
                        <div className={b('combinator')}>
                            <Select
                                size="s"
                                value={[combinators[i - 1]?.operator ?? '&&']}
                                options={COMBINATOR_OPTIONS}
                                onUpdate={(next) => updateCombinator(i - 1, next[0] as '&&' | '||')}
                                width={80}
                            />
                        </div>
                    )}
                    <div className={b('condition')}>
                        <Select
                            size="s"
                            value={[cond.field]}
                            options={fieldOptions}
                            onUpdate={(next) => updateCondition(i, {field: next[0] ?? ''})}
                            placeholder="field"
                            filterable
                            width="max"
                        />
                        <Select
                            size="s"
                            value={[cond.operator]}
                            options={OPERATOR_OPTIONS}
                            onUpdate={(next) =>
                                updateCondition(i, {operator: next[0] as '===' | '!=='})
                            }
                            width={80}
                        />
                        <TextInput
                            size="s"
                            value={displayValue(cond.value)}
                            onUpdate={(value) => updateCondition(i, {value: coerceValue(value)})}
                            placeholder='value ("true"/"false" → bool)'
                        />
                        <Button
                            view="flat-danger"
                            size="s"
                            onClick={() => removeCondition(i)}
                            title="Remove condition"
                        >
                            <Icon data={TrashBin} size={12} />
                        </Button>
                    </div>
                </React.Fragment>
            ))}
            <div className={b('actions')}>
                <Button view="normal" size="s" onClick={addCondition}>
                    + Add condition
                </Button>
                <Button view="flat" size="s" onClick={clearAll}>
                    Clear
                </Button>
            </div>
        </div>
    );
};
