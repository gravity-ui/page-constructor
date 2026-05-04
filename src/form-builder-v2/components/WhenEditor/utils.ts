import type {When} from '../../../form-generator-v2/types';

export type Condition = {field: string; operator: '===' | '!=='; value: string | boolean};
export type Combinator = {operator: '&&' | '||'};

export const OPERATOR_OPTIONS = [
    {value: '===', content: 'is'},
    {value: '!==', content: 'is not'},
];

export const COMBINATOR_OPTIONS = [
    {value: '&&', content: 'AND'},
    {value: '||', content: 'OR'},
];

export const parse = (
    when: When | undefined,
): {conditions: Condition[]; combinators: Combinator[]} => {
    const conditions: Condition[] = [];
    const combinators: Combinator[] = [];
    if (!when) return {conditions, combinators};

    let lastWasCombinator = false;

    for (const entry of when) {
        const isCondition =
            Boolean(entry.field) && (entry.operator === '===' || entry.operator === '!==');
        const isCombinator = !entry.field && (entry.operator === '&&' || entry.operator === '||');

        if (isCondition) {
            conditions.push({
                field: entry.field as string,
                operator: entry.operator as '===' | '!==',
                value: entry.value ?? '',
            });
            lastWasCombinator = false;
            continue;
        }

        if (isCombinator) {
            if (conditions.length === 0 || lastWasCombinator) continue;
            combinators.push({operator: entry.operator as '&&' | '||'});
            lastWasCombinator = true;
        }
    }

    if (lastWasCombinator) {
        combinators.pop();
    }

    while (combinators.length < conditions.length - 1) {
        combinators.push({operator: '&&'});
    }

    if (combinators.length > Math.max(0, conditions.length - 1)) {
        combinators.length = Math.max(0, conditions.length - 1);
    }

    return {conditions, combinators};
};

export const serialize = (conditions: Condition[], combinators: Combinator[]): When | undefined => {
    if (conditions.length === 0) return undefined;
    const out: When = [];
    conditions.forEach((cond, i) => {
        if (i > 0) {
            const combinator = combinators[i - 1] ?? {operator: '&&'};
            out.push({operator: combinator.operator});
        }
        out.push({
            field: cond.field,
            operator: cond.operator,
            value: cond.value,
        });
    });
    return out;
};

export const coerceValue = (raw: string): string | boolean => {
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return raw;
};

export const displayValue = (value: string | boolean | undefined): string => {
    if (value === true) return 'true';
    if (value === false) return 'false';
    return value ?? '';
};
