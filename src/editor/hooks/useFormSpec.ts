import {useMemo} from 'react';

import {JSONSchema4} from 'json-schema';

import formSpecParser from '../dynamic-forms-custom/parser';

export default function useFormSpec(schema: JSONSchema4) {
    return useMemo(() => formSpecParser.parse(schema), [schema]);
}
