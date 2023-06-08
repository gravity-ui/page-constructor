import {useMemo} from 'react';

import {SchemaCustomConfig, generateDefaultSchema} from '../../schema';
import formSpecParser from '../dynamic-forms-custom/parser';

export default function useFormSpec(customSchema?: SchemaCustomConfig) {
    return useMemo(() => {
        const schema = generateDefaultSchema(customSchema);

        return formSpecParser.parse(schema);
    }, [customSchema]);
}
