import * as React from 'react';

import {Content, OnUpdate, When} from '../../types';
import {getValueByPath} from '../../utils/fields';

import './Base.scss';

type BaseProps = {
    when?: When;
    content: Content;
    name?: string;
    onUpdate?: OnUpdate;
    defaultValue?: unknown;
    children: React.ReactNode;
};

const Base = ({when, content, children, name, onUpdate, defaultValue}: BaseProps) => {
    const verifiedConditions = React.useMemo(() => {
        if (!when) {
            return true;
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
        () => Boolean(!when || !content || verifiedConditions),
        [content, verifiedConditions, when],
    );

    const wasVisibleRef = React.useRef(false);

    React.useEffect(() => {
        const wasVisible = wasVisibleRef.current;
        wasVisibleRef.current = isShow;

        if (
            wasVisible &&
            !isShow &&
            onUpdate &&
            name &&
            getValueByPath(content, name) !== undefined
        ) {
            onUpdate(name, undefined, {unset: true});
        } else if (
            !wasVisible &&
            isShow &&
            onUpdate &&
            name &&
            defaultValue !== undefined &&
            getValueByPath(content, name) === undefined
        ) {
            onUpdate(name, defaultValue);
        }
    }, [content, isShow, name, onUpdate, defaultValue]);

    return isShow ? children : null;
};

export default Base;
