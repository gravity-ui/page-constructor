/* eslint-disable testing-library/prefer-screen-queries -- These are Playwright locators. */
import {expect, test} from '../../../../playwright/core/index';

import {MarkdownBuilderHarness, MarkdownInputHarness} from './helpers';

test.describe('MarkdownEditorInput', () => {
    test('edits Markdown and switches between visual and source modes', async ({mount, page}) => {
        const component = await mount(<MarkdownInputHarness />);
        const editor = component.getByTestId('markdown-editor');
        await expect(editor.getByTestId('g-md-editor-mode')).toHaveAttribute(
            'data-mode',
            'wysiwyg',
        );
        await expect(editor.locator('.ProseMirror strong')).toHaveText('Initial notes');
        await editor.getByTestId('g-md-settings-button').click();
        await page.getByTestId('g-md-settings-mode-markup').click();
        await expect(editor.getByTestId('g-md-editor-mode')).toHaveAttribute('data-mode', 'markup');
        const source = editor.locator('.cm-content');
        await expect(source).toContainText('**Initial notes**');
        await source.fill('## Updated notes');
        await expect(component.getByTestId('value')).toHaveText('## Updated notes');
        await editor.getByTestId('g-md-settings-button').click();
        await page.getByTestId('g-md-settings-mode-wysiwyg').click();
        await expect(editor.locator('.ProseMirror h2')).toHaveText('Updated notes');
        await editor.getByTestId('g-md-settings-button').click();
        await page.getByTestId('g-md-settings-mode-markup').click();
        await editor.locator('.cm-content').fill('');
        await expect(component.getByTestId('value')).toHaveText('');
    });

    test('applies external updates without echo and preserves explicit empty values', async ({
        mount,
    }) => {
        const component = await mount(<MarkdownInputHarness />);
        const editor = component.getByTestId('markdown-editor');
        await expect(editor.locator('.ProseMirror strong')).toHaveText('Initial notes');
        await component.getByRole('button', {name: 'Replace value'}).click();
        await expect(editor.locator('.ProseMirror h2')).toHaveText('External notes');
        await expect(component.getByTestId('updates')).toHaveText('0');
        await component.getByRole('button', {name: 'Clear value'}).click();
        await expect(editor.locator('.ProseMirror h2')).toHaveCount(0);
        await expect(editor.locator('.ProseMirror')).toContainText('Write notes');
        await expect(component.getByTestId('value')).toHaveText('');
        await expect(component.getByTestId('updates')).toHaveText('0');
    });

    test('blocks unsafe attachment URLs entered in source mode', async ({mount, page}) => {
        const component = await mount(<MarkdownInputHarness />);
        const editor = component.getByTestId('markdown-editor');
        const markup = '{% file src="javascript:window.__markdownFileXss=true" name="report" %}';

        await editor.getByTestId('g-md-settings-button').click();
        await page.getByTestId('g-md-settings-mode-markup').click();
        await editor.locator('.cm-content').fill(markup);
        await expect(component.getByTestId('value')).toHaveText(markup);

        await editor.getByTestId('g-md-settings-button').click();
        await page.getByTestId('g-md-settings-mode-wysiwyg').click();
        await expect(editor.getByRole('link', {name: 'report'})).toHaveCount(0);
        await expect(editor.getByText('report', {exact: true})).toHaveJSProperty('tagName', 'SPAN');
        await editor.getByText('report', {exact: true}).click();
        expect(await page.evaluate(() => Reflect.has(window, '__markdownFileXss'))).toBe(false);
    });

    test('blocks unsafe attachment URLs pasted as HTML', async ({mount, page}) => {
        const component = await mount(<MarkdownInputHarness />);
        const editor = component.getByTestId('markdown-editor');
        const content = editor.locator('.ProseMirror');
        await content.click();
        await content.evaluate((element) => {
            const clipboardData = new DataTransfer();
            clipboardData.setData(
                'text/html',
                '<a class="yfm-file" href="javascript:window.__markdownFileXss=true" download="report">report</a>',
            );
            element.dispatchEvent(
                new ClipboardEvent('paste', {clipboardData, bubbles: true, cancelable: true}),
            );
        });

        await expect(editor.getByRole('link', {name: 'report'})).toHaveCount(0);
        await expect(editor.getByText('report', {exact: true})).toHaveJSProperty('tagName', 'SPAN');
        await editor.getByText('report', {exact: true}).click();
        expect(await page.evaluate(() => Reflect.has(window, '__markdownFileXss'))).toBe(false);
    });

    for (const theme of ['light', 'dark'] as const) {
        test(`fits a narrow container in the ${theme} theme`, async ({mount}, testInfo) => {
            const component = await mount(<MarkdownInputHarness theme={theme} />);
            const editor = component.getByTestId('markdown-editor');
            await expect(editor.locator('.ProseMirror')).toBeVisible();
            const overflow = await editor.evaluate(
                (element) => element.scrollWidth > element.clientWidth,
            );
            expect(overflow).toBe(false);
            await component.screenshot({path: testInfo.outputPath(`markdown-${theme}.png`)});
        });
    }

    test('edits defaults in the builder inspector and adds Markdown from the palette', async ({
        mount,
    }) => {
        const component = await mount(<MarkdownBuilderHarness />);
        await component.getByText('Notes', {exact: true}).click();
        const inspector = component.locator('.pcformbuilderv2-inspector');
        await expect(inspector.locator('.ProseMirror')).toContainText('Default notes');
        await inspector.locator('.ProseMirror').fill('New default');
        await expect(component.getByTestId('schema')).toContainText('New default');
        const editors = component.locator('.pc-markdown-editor-input');
        await expect(editors).toHaveCount(2);
        await expect(editors.first().locator('.ProseMirror')).toContainText('Default notes');
        const canvasInput = editors.first().locator('.ProseMirror');
        await canvasInput.click();
        await canvasInput.press('ControlOrMeta+A');
        await canvasInput.pressSequentially('Edited canvas content');
        await expect(canvasInput).toContainText('Edited canvas content');
        await component.getByRole('button', {name: 'Markdown', exact: true}).click();
        await expect(component.getByTestId('schema')).toContainText('"title":"Markdown"');
    });
});
