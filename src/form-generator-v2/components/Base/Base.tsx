import './Base.scss';
import {formGeneratorCn} from '../../utils/cn';

const b = formGeneratorCn('base');

const Base = ({when, content, children}) => {
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
            const fieldValue = data[condition.field];
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

    return isShow ? children : null;
};

export default Base;
