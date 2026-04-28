import {get} from 'lodash';

import type {Content, When} from '../../form-generator-v2/types';

export const evaluateWhen = (when: When | undefined, content: Content): boolean => {
    if (!when || when.length === 0) {
        return true;
    }

    let result: boolean | null = null;
    let currentOperator: string | null = null;

    for (const condition of when) {
        if (condition.operator && !condition.field) {
            currentOperator = condition.operator;
            continue;
        }

        let currentResult = false;
        if (condition.field) {
            const fieldValue = get(content, condition.field);
            const value = condition.value;
            if (condition.operator === '===') {
                currentResult = fieldValue === value;
            } else if (condition.operator === '!==') {
                currentResult = fieldValue !== value;
            }
        }

        if (result === null) {
            result = currentResult;
        } else if (currentOperator === '||') {
            result = result || currentResult;
        } else if (currentOperator === '&&') {
            result = result && currentResult;
        }

        currentOperator = null;
    }

    return Boolean(result);
};
