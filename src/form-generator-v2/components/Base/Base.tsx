import * as React from 'react';

import {Content, OnUpdate, When} from '../../types';
import {getValueByPath} from '../../utils/fields';

type BaseProps = {
    when?: When;
    content: Content;
    name?: string;
    onUpdate?: OnUpdate;
    children: React.ReactNode;
};

const Base = ({when, content, children, name, onUpdate}: BaseProps) => {
    const verifiedConditions = React.useMemo(() => {
        if (!when) {
            return;
        }

        let result = null;
        let currentOperator = null;

        for (let i = 0; i < when.length; i++) {
            const condition = when[i];

            if (condition.operator && !condition.field) {
                currentOperator = condition.operator;
                continue;
            }

            let currentResult = false;
            if (condition.field) {
                const fieldValue = getValueByPath(content, condition.field);
                const value = condition.value;

                switch (condition.operator) {
                    case '===':
                        currentResult = fieldValue === value;
                        break;
                    case '!==':
                        currentResult = fieldValue !== value;
                        break;
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
    }, [content, when]);

    const isShow = React.useMemo(
        () => !when || !content || verifiedConditions,
        [content, verifiedConditions, when],
    );

    const wasVisibleRef = React.useRef(isShow);

    React.useEffect(() => {
        if (wasVisibleRef.current && !isShow && onUpdate && name) {
            onUpdate(name, undefined, {unset: true});
        }
        wasVisibleRef.current = isShow;
    }, [isShow, name, onUpdate]);

    return isShow ? children : null;
};

export default Base;
