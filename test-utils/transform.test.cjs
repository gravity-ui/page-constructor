const assert = require('node:assert/strict');
const {test} = require('node:test');

const {contentTransformer, transformMarkdown} = require('../server');

test('preserves Markdown classes and heading IDs by default', () => {
    const {html} = transformMarkdown('Text {.custom}\n\n## Heading {#stable-id}', {lang: 'en'});

    assert.match(html, /<p class="custom">Text<\/p>/);
    assert.match(html, /<h2 id="stable-id">/);
    assert.doesNotMatch(html, /\{#stable-id\}/);
});

test('allows callers to disable Markdown attributes', () => {
    const {html} = transformMarkdown('Text {.custom}', {lang: 'en', enableMarkdownAttrs: false});

    assert.match(html, /Text \{\.custom\}/);
    assert.doesNotMatch(html, /class="custom"/);
});

test('uses a caller-provided code highlighter', () => {
    const {html} = transformMarkdown('```text\n<example>\n```', {
        lang: 'en',
        highlighter: (source) => ({html: source.replace('<example>', '<b>example</b>')}),
    });

    assert.match(html, /<b>example<\/b>/);
    assert.doesNotMatch(html, /&lt;example&gt;/);
});

test('filters blocks using Liquid expressions', () => {
    const kept = {type: 'header-block', title: 'Kept', when: 'audience == "external"'};
    const hidden = {type: 'header-block', title: 'Hidden', when: 'audience == "internal"'};

    const result = contentTransformer({
        content: {blocks: [kept, hidden]},
        options: {lang: 'en', vars: {audience: 'external'}},
    });

    assert.deepEqual(result.blocks, [kept]);
});
