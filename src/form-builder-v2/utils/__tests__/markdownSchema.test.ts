import type {FormField} from '../../types';
import {createDefaultField} from '../fieldDefaults';
import {parseSchema} from '../parseSchema';
import {stripIds} from '../stripIds';

describe('Markdown field schema', () => {
    const field: FormField = {
        id: 'markdown',
        type: 'markdownEditor',
        name: 'chapters[{{index}}].text',
        title: 'Text',
        defaultValue: '**Default**',
        placeholder: 'Write Markdown',
        when: [{field: 'enabled', operator: '===', value: true}],
    };

    test('creates a named Markdown field from the palette', () => {
        expect(createDefaultField('markdownEditor', 'notes', 'new')).toEqual({
            id: 'new',
            type: 'markdownEditor',
            name: 'notes',
            title: 'Markdown',
        });
    });

    test('preserves nested Markdown fields through export and import', () => {
        const fields: FormField[] = [
            {id: 'section', type: 'section', title: 'Chapters', index: 'index', fields: [field]},
        ];
        const exported = stripIds(fields);
        const parsed = parseSchema(JSON.stringify(exported));
        expect(parsed.ok).toBe(true);
        if (parsed.ok) expect(stripIds(parsed.fields)).toEqual(exported);
    });

    test.each([
        {name: undefined},
        {title: undefined},
        {defaultValue: 42},
        {defaultValue: []},
        {placeholder: false},
    ])('rejects invalid Markdown field properties: %j', (updates) => {
        expect(parseSchema(JSON.stringify([{...field, ...updates}])).ok).toBe(false);
    });

    test('accepts an explicit empty default', () => {
        expect(parseSchema(JSON.stringify([{...field, defaultValue: ''}])).ok).toBe(true);
    });
});
