import {ComponentMap} from '../../../../.storybook/component-map/ComponentMap';
import {expect, test} from '../../../../playwright/core/index';

const data = {
    nodes: [
        {
            id: 'block:LandingBlock',
            kind: 'block',
            exportName: 'LandingBlock',
            label: 'LandingBlock',
        },
        {
            id: 'block:NavigationBlock',
            kind: 'block',
            exportName: 'NavigationBlock',
            label: 'NavigationBlock',
        },
        {
            id: 'sub-block:Content',
            kind: 'sub-block',
            exportName: 'Content',
            label: 'Content',
        },
        {
            id: 'sub-block:NavigationItem',
            kind: 'sub-block',
            exportName: 'NavigationItem',
            label: 'NavigationItem',
        },
        {
            id: 'component:ComponentWithACompleteDescriptivePublicExportName',
            kind: 'component',
            exportName: 'ComponentWithACompleteDescriptivePublicExportName',
            label: 'ComponentWithACompleteDescriptivePublicExportName',
        },
        {
            id: 'component:Link',
            kind: 'component',
            exportName: 'Link',
            label: 'Link',
        },
    ],
    edges: [
        {source: 'block:LandingBlock', target: 'sub-block:Content'},
        {
            source: 'sub-block:Content',
            target: 'component:ComponentWithACompleteDescriptivePublicExportName',
        },
        {source: 'block:NavigationBlock', target: 'sub-block:NavigationItem'},
        {source: 'sub-block:NavigationItem', target: 'component:Link'},
    ],
} satisfies Parameters<typeof ComponentMap>[0]['data'];

test('renders default, search, and selected component map states', async ({
    mount,
    expectScreenshot,
    page,
}) => {
    await page.setViewportSize({width: 1200, height: 800});
    await mount(
        <div className="component-map-visual-fixture" style={{width: 1100, height: 680}}>
            <style>{`.component-map-visual-fixture .pc-component-map {
                height: 100%;
                min-height: 0;
            }`}</style>
            <ComponentMap data={data} />
        </div>,
    );
    const waitForTwoAnimationFrames = () =>
        page.evaluate(
            () =>
                new Promise<void>((resolve) =>
                    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
                ),
        );

    await waitForTwoAnimationFrames();
    await expectScreenshot({screenshotName: 'ComponentMap default', skipTheme: 'dark'});

    // Playwright's page is not a Testing Library render result.
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const searchInput = page.getByRole('textbox', {name: 'Search components'});
    await searchInput.fill('content');
    await waitForTwoAnimationFrames();
    await expectScreenshot({screenshotName: 'ComponentMap search', skipTheme: 'dark'});

    const canvas = page.locator('canvas[aria-label="Significant component dependency map"]');
    await canvas.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(searchInput).toHaveValue('');
    await waitForTwoAnimationFrames();
    await expectScreenshot({screenshotName: 'ComponentMap selected', skipTheme: 'dark'});
});
