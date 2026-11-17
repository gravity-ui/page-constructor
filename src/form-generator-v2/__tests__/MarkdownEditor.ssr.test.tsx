/** @jest-environment node */
import {renderToString} from 'react-dom/server';

import FormGenerator from '../FormGenerator';

describe('Markdown form field SSR', () => {
    test.each([
        {type: 'textArea' as const, value: '**Saved**', expected: '**Saved**'},
        {type: 'markdownEditor' as const, value: '**Saved**', expected: '**Saved**'},
        {type: 'markdownEditor' as const, value: undefined, expected: '**Default**'},
        {type: 'markdownEditor' as const, value: '', expected: ''},
    ])('renders $type with value $value without a DOM', ({type, value, expected}) => {
        const onUpdate = jest.fn();
        expect(typeof document).toBe('undefined');

        const view = renderToString(
            <FormGenerator
                blockConfig={[
                    {
                        type,
                        name: 'page.notes',
                        title: 'Notes',
                        defaultValue: '**Default**',
                        placeholder: 'Write notes',
                    },
                ]}
                contentConfig={{page: {notes: value}}}
                onUpdate={onUpdate}
            />,
        );

        expect(view).toContain('<textarea');
        expect(view).toContain(`>${expected}</textarea>`);
        expect(view).toContain('placeholder="Write notes"');
        expect(onUpdate).not.toHaveBeenCalled();
    });
});
