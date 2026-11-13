/* eslint-disable testing-library/prefer-screen-queries -- Playwright queries the browser page. */
import type {Page} from '@playwright/test';

import {expect, test} from '../../../../../playwright/core';

import {
    CodeLanguageSettings,
    JsonDiagnosticInputs,
    ValidatedCodeInput,
    YamlDiagnosticInputs,
} from './helpers';

const pressEditorShortcut = async (page: Page, command: 'selectAll' | 'documentEnd') => {
    // Monaco uses the emulated user agent, which may differ from the host OS.
    const isMac = await page.evaluate(() => navigator.userAgent.includes('Macintosh'));
    if (command === 'selectAll') {
        await page.keyboard.press(isMac ? 'Meta+A' : 'Control+A');
    } else {
        await page.keyboard.press(isMac ? 'Meta+ArrowDown' : 'Control+End');
    }
};

test.describe('CodeInput', () => {
    test('validates YAML by default and clears markers when fixed or switched to another language', async ({
        mount,
        page,
    }, testInfo) => {
        await mount(<YamlDiagnosticInputs />);

        const firstField = page.locator('.pc-fg-code-input').nth(0);
        const secondField = page.locator('.pc-fg-code-input').nth(1);
        const firstMessage = firstField.locator('.pc-fg-code-input__validation-message');
        const secondMessage = secondField.locator('.pc-fg-code-input__validation-message');
        await expect(firstMessage).toContainText(
            '2:17: unexpected end of the stream within a flow collection',
        );
        await expect(secondMessage).toHaveCount(0);
        await firstField.screenshot({path: testInfo.outputPath('yaml-diagnostics.png')});

        await firstField.locator('.view-lines').click();
        await pressEditorShortcut(page, 'documentEnd');
        await page.keyboard.type(']');
        await expect(firstMessage).toHaveCount(0);

        await secondField.locator('.view-lines').click();
        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('items: [one, two');
        await page.keyboard.press('Delete');
        await expect(secondMessage).toContainText(
            'unexpected end of the stream within a flow collection',
        );
        await expect(firstMessage).toHaveCount(0);

        await page.getByRole('button', {name: 'Switch language'}).click();
        await expect(secondField).not.toContainText(
            'unexpected end of the stream within a flow collection',
        );
        await page.getByRole('button', {name: 'Switch language'}).click();
        await expect(secondMessage).toContainText(
            'unexpected end of the stream within a flow collection',
        );
    });

    test('shows built-in JSON errors and warnings below their own field', async ({
        mount,
        page,
    }, testInfo) => {
        await mount(<JsonDiagnosticInputs />);

        const firstField = page.locator('.pc-fg-code-input').nth(0);
        const secondField = page.locator('.pc-fg-code-input').nth(1);
        const firstMessage = firstField.locator('.pc-fg-code-input__validation-message');
        const secondMessage = secondField.locator('.pc-fg-code-input__validation-message');

        await expect(firstMessage).toContainText(/1:\d+: Value expected/);
        await expect(firstMessage).toContainText('Custom rule');
        await expect(secondMessage).toHaveCount(0);
        await firstField.screenshot({path: testInfo.outputPath('diagnostics.png')});

        await firstField.locator('.view-lines').click();
        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('{"enabled": true}');
        await expect(firstMessage).toHaveText('Custom rule');

        await secondField.locator('.view-lines').click();
        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('{"count": }');
        await expect(secondMessage).toContainText('Value expected');
        await expect(firstMessage).toHaveText('Custom rule');

        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('{"count": 1, "count": 2}');
        await expect(secondMessage).toContainText('Duplicate object key');

        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('{"count": 1}');
        await expect(secondMessage).toHaveCount(0);
    });

    test('displays validation feedback and accepts invalid edits', async ({
        mount,
        page,
    }, testInfo) => {
        await mount(<ValidatedCodeInput />);

        const validationMessage = page
            .getByRole('alert')
            .filter({hasText: 'Invalid configuration'});
        await expect(validationMessage).toBeVisible();
        const editor = page.locator('.monaco-editor textarea');
        await expect(editor).toBeVisible();
        await page.locator('.playwright-wrapper-test').screenshot({
            path: testInfo.outputPath('validation.png'),
        });
        await page.locator('.view-lines').click();
        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.type('valid');
        await expect(validationMessage).toHaveCount(0);

        await pressEditorShortcut(page, 'selectAll');
        await page.keyboard.type('invalid again');
        await expect(validationMessage).toBeVisible();
        await expect(page.locator('.view-lines')).toContainText('invalid again');
    });

    test('offers only YAML and JSON', async ({mount, page}) => {
        await mount(<CodeLanguageSettings />);

        await page.getByRole('combobox').click();
        await expect(page.getByRole('option')).toHaveText(['YAML', 'JSON']);
    });
});
