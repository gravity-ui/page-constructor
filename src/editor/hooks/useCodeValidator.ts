import {useCallback, useMemo} from 'react';

import {JSONSchema4} from 'json-schema';

import {initAjv, validate} from '../utils/validation';

export function useCodeValidator(schema: JSONSchema4) {
    const ajv = useMemo(() => initAjv([schema]), [schema]);

    return useCallback((code: string) => validate(code, ajv, schema), [ajv, schema]);
}
