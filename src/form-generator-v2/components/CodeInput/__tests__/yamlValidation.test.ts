import {validateYaml} from '../yamlValidation';

describe('YAML syntax validation', () => {
    test('reports the unclosed list from the user example at the end of the actual document', () => {
        expect(validateYaml('title: Пример\nitems: [one, two')).toEqual([
            {
                message: 'unexpected end of the stream within a flow collection',
                severity: 'error',
                line: 2,
                column: 17,
            },
        ]);
    });

    test.each(['', 'title: Пример\nitems: [one, two]', 'name: first\n---\nname: second'])(
        'accepts valid YAML: %s',
        (code) => {
            expect(validateYaml(code)).toEqual([]);
        },
    );

    test('reports an invalid indentation at the parser position', () => {
        const [diagnostic] = validateYaml('items:\n  - one\n - two');
        expect(diagnostic).toMatchObject({severity: 'error', line: 3, column: 2});
    });
});
