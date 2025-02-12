import * as React from 'react';

import {JSONSchema4} from 'json-schema';

import {CodeEditorMessageProps, createValidator, validate} from '../utils/validation';

export type CodeValidator = (code: string) => CodeEditorMessageProps;

export function useCodeValidator(schema: JSONSchema4): CodeValidator {
    const validator = React.useMemo(() => createValidator(schema), [schema]);

    return React.useCallback((code: string) => validate(code, validator), [validator]);
}
