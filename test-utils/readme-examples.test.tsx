/**
 * Validation harness for the consumer README.md files.
 *
 * For every README under src/blocks and src/sub-blocks it:
 *   1. Extracts the JSON example under the "## Example" section.
 *   2. Validates it against the library's own JSON-Schema (the same schema the
 *      editor / runtime uses) via ajv + ajv-keywords `select`.
 *   3. Renders it through <PageConstructor> inside <PageConstructorProvider>
 *      (sub-blocks are wrapped in a `card-layout-block` host) and asserts the
 *      render does not throw.
 *
 * Block examples are validated against the root schema `{blocks: [...]}`.
 * Sub-block examples are wrapped as a child of a `card-layout-block` host
 * (the select-based schema only resolves the card type when nested as a child).
 */
import * as fs from 'fs';
import * as path from 'path';

import {render} from '@testing-library/react';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';

import {PageConstructor, PageConstructorProvider} from '../src';
import {generateDefaultSchema} from '../src/schema';
import {constructorBlockSchemaNames} from '../src/schema/constants';

const ajv = new Ajv({allErrors: true, $data: true, strict: false});
ajvKeywords(ajv as never);
const rootSchema = generateDefaultSchema();
ajv.addSchema(rootSchema as never);
const validatePage = ajv.getSchema('self');

// Sub-blocks that are not standalone children: they are nested structures
// (Content = list-item shape used inside cards; HubspotForm = `hubspot` prop
// of form-block). Their README example is documented as the nested object.
const NESTED = new Set(['content', 'hubspot-form']);

// Examples that are correct (they match the block's own `__stories__/data.json`
// and render fine) but are rejected by `generateDefaultSchema()` due to
// pre-existing gaps in the library's schema bundle — NOT problems in the docs.
// Each entry documents why the schema check is skipped, so the gap is visible.
const SCHEMA_GAP: Record<string, string> = {
    'hero-block':
        'not registered in the schema bundle (src/schema/validators/blocks.ts never imports Hero)',
    'foldable-list-block':
        'not registered in the schema bundle (src/schema/validators/blocks.ts never imports FoldableList)',
    'form-block':
        'formData is an ambiguous oneOf — both branches are bare {object} with no `required`, so any value matches both',
    'tabs-block':
        'items[].media is withTheme() whose no-theme branch lacks additionalProperties:false, so a themed object matches both branches',
    'info-block':
        "schema marks `title`/`sectionsTitle` required, but the block's own storybook data omits them (over-strict)",
    'basic-card':
        'icon accepts a themed {light,dark} at runtime (see storybook data) but the schema declares plain ImageProps',
    'image-card':
        'image accepts a themed {light,dark} at runtime (see storybook data) but the schema declares plain ImageProps',
};

type Example = {relPath: string; kind: 'block' | 'sub-block'; json: object};

const REPO = path.resolve(__dirname, '..');

function extractExample(file: string): object | null {
    const content = fs.readFileSync(file, 'utf8');
    const exampleIdx = content.indexOf('## Example');
    if (exampleIdx === -1) return null;
    const after = content.slice(exampleIdx);
    const match = after.match(/```json\n([\s\S]*?)\n```/);
    if (!match) return null;
    try {
        return JSON.parse(match[1]);
    } catch {
        throw new Error(`README example is not valid JSON: ${file}\n${match[1].slice(0, 200)}`);
    }
}

function collect(): Example[] {
    const out: Example[] = [];
    for (const kind of ['block', 'sub-block'] as const) {
        const base = kind === 'block' ? 'src/blocks' : 'src/sub-blocks';
        const absBase = path.join(REPO, base);
        for (const dir of fs.readdirSync(absBase)) {
            const readme = path.join(absBase, dir, 'README.md');
            if (!fs.existsSync(readme)) continue;
            const json = extractExample(readme);
            if (!json) continue;
            out.push({relPath: path.join(base, dir, 'README.md'), kind, json});
        }
    }
    return out;
}

const examples = collect();

describe.each(examples)('$relPath', ({kind, json}) => {
    // Determine how this example must be wrapped to validate against the schema.
    // - block → top-level block
    // - sub-block whose type is a registered card → child of card-layout-block
    // - sub-block whose type is a registered block-child (e.g. divider) → top-level
    // - nested sub-block (content, hubspot-form) → skip schema test
    const type = (json as {type?: string}).type ?? '';
    const nested = kind === 'sub-block' && NESTED.has(type);
    const gap = SCHEMA_GAP[type];
    const skipSchema = nested || Boolean(gap);
    const wrap =
        kind === 'block' || constructorBlockSchemaNames.includes(type)
            ? {blocks: [json]}
            : {blocks: [{type: 'card-layout-block', children: [json]}]};

    (skipSchema ? test.skip : test)('example conforms to the JSON-Schema', () => {
        if (!validatePage) throw new Error('root schema was not compiled');
        const valid = validatePage(wrap);
        if (!valid) {
            throw new Error(
                'Schema validation failed:\n' +
                    (validatePage.errors || [])
                        .map(
                            (e) => `  ${e.instancePath || '(root)'} ${e.schemaPath} — ${e.message}`,
                        )
                        .join('\n'),
            );
        }
    });

    test('example renders without throwing', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        try {
            const {container, unmount} = render(
                <PageConstructorProvider>
                    <PageConstructor content={wrap as never} />
                </PageConstructorProvider>,
            );
            expect(container).toBeTruthy();
            unmount();
        } finally {
            spy.mockRestore();
        }
    });
});
