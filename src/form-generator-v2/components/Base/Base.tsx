import './Base.scss';
import {formGeneratorCn} from '../../utils/cn';
import * as React from 'react';
import {getValueByPath} from '../../utils/fields';

const b = formGeneratorCn('base');

const Base = ({when, content, children, clearPath, onUpdate}) => {
    const evaluateConditions = (conditions, data) => {
        let result = null;
        let currentOperator = null;

        for (let i = 0; i < conditions.length; i++) {
            const condition = conditions[i];

            // Логический оператор
            if (condition.operator && !condition.field) {
                currentOperator = condition.operator;
                continue;
            }

            // Вычисляем условие
            const fieldValue = getValueByPath(data, condition.field);
            const value = condition.value;
            let currentResult = false;

            switch (condition.operator) {
                case '===':
                    currentResult = fieldValue === value;
                    break;
                case '!==':
                    currentResult = fieldValue !== value;
                    break;
                case '==':
                    currentResult = fieldValue == value;
                    break;
                case '!=':
                    currentResult = fieldValue != value;
                    break;
                case '>':
                    currentResult = fieldValue > value;
                    break;
                case '<':
                    currentResult = fieldValue < value;
                    break;
                case '>=':
                    currentResult = fieldValue >= value;
                    break;
                case '<=':
                    currentResult = fieldValue <= value;
                    break;
            }

            // Первое условие
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

    const isShow = !when || !content || evaluateConditions(when, content);
    const wasVisibleRef = React.useRef(isShow);

    React.useEffect(() => {
        const wasVisible = wasVisibleRef.current;
        if (
            wasVisible &&
            !isShow &&
            typeof clearPath === 'string' &&
            clearPath.length > 0 &&
            onUpdate
        ) {
            onUpdate(clearPath, undefined, {unset: true});
        }
        wasVisibleRef.current = isShow;
    }, [isShow, clearPath, onUpdate]);

    return isShow ? children : null;
};

export default Base;
