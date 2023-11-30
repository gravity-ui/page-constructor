import {useCallback, useMemo} from 'react';

import {JSONSchema4} from 'json-schema';

import {CodeEditorMessageProps, createValidator, validate} from '../utils/validation';

export type CodeValidator = (code: string) => CodeEditorMessageProps;

export function useCodeValidator(schema: JSONSchema4): CodeValidator {
    const validator = useMemo(() => createValidator(schema), [schema]);

    return useCallback((code: string) => validate(code, validator), [validator]);
}
