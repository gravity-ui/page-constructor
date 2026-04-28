import type {Fields} from '../../form-generator-v2/types';
import type {FormField} from '../types';

export const stripIds = (fields: FormField[]): Fields =>
    fields.map((field) => {
        const {id: _id, ...rest} = field;
        if (rest.type === 'section') {
            return {...rest, fields: stripIds(rest.fields)};
        }
        return rest;
    }) as Fields;
