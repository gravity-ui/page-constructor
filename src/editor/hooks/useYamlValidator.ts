import {useCallback, useMemo} from 'react';

import {JSONSchema4} from 'json-schema';

import {initAjv, validateYAML} from '../utils/validation';

export function useCodeValidator(schema: JSONSchema4) {
    const ajv = useMemo(() => initAjv([schema]), [schema]);

    return useCallback((code: string) => validateYAML(code, ajv, schema), [ajv, schema]);
}
