import {expect, test} from '../../../../playwright/core/index';
import {ComponentMap} from '../ComponentMap';
import {getCubicBezierPoint, getEdgeGeometry} from '../edgeGeometry';
import {layoutComponentMap} from '../layout';
import {fitToViewport, worldToScreen} from '../viewport';

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
        {source: 'block:LandingBlock', target: 'block:NavigationBlock'},
        {source: 'block:LandingBlock', target: 'sub-block:Content'},
        {
            source: 'sub-block:Content',
            target: 'component:ComponentWithACompleteDescriptivePublicExportName',
        },
        {source: 'block:NavigationBlock', target: 'sub-block:NavigationItem'},
        {source: 'sub-block:NavigationItem', target: 'component:Link'},
    ],
} satisfies Parameters<typeof ComponentMap>[0]['data'];

test('renders default, search, and pointer interaction component map states', async ({
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
    const layout = layoutComponentMap(data);
    const canvas = page.locator('canvas[aria-label="Significant component dependency map"]');

    const getCanvasPoint = async (worldPoint: {x: number; y: number}) => {
        const bounds = await canvas.boundingBox();
        if (!bounds) {
            throw new Error('ComponentMap canvas has no bounding box');
        }
        const transform = fitToViewport(layout.bounds, {
            width: bounds.width,
            height: bounds.height,
        });
        const point = worldToScreen(worldPoint, transform);
        return {x: bounds.x + point.x, y: bounds.y + point.y};
    };

    const getNodePoint = (nodeId: string) => {
        const node = layout.nodes.find(({id}) => id === nodeId);
        if (!node) {
            throw new Error(`Visual fixture node ${nodeId} was not found`);
        }
        return getCanvasPoint({
            x: node.rect.x + node.rect.width / 2,
            y: node.rect.y + node.rect.height / 2,
        });
    };

    const getEdgePoint = (edgeIndex: number) => {
        const edge = layout.edges[edgeIndex];
        return getCanvasPoint(getCubicBezierPoint(getEdgeGeometry(edge.source, edge.target), 0.5));
    };

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

    const selectedNodePoint = await getNodePoint('sub-block:Content');
    await page.mouse.click(selectedNodePoint.x, selectedNodePoint.y);
    await expect(searchInput).toHaveValue('');
    await waitForTwoAnimationFrames();
    await expectScreenshot({screenshotName: 'ComponentMap selected', skipTheme: 'dark'});

    const canvasBounds = await canvas.boundingBox();
    if (!canvasBounds) {
        throw new Error('ComponentMap canvas has no bounding box');
    }
    await page.mouse.click(canvasBounds.x + 5, canvasBounds.y + 5);
    const firstEdgePoint = await getEdgePoint(0);
    await page.mouse.move(firstEdgePoint.x, firstEdgePoint.y);
    await waitForTwoAnimationFrames();
    await expectScreenshot({screenshotName: 'ComponentMap edge hover', skipTheme: 'dark'});

    await page.mouse.click(firstEdgePoint.x, firstEdgePoint.y);
    const secondEdgePoint = await getEdgePoint(2);
    const additiveModifier = (await page.evaluate(() =>
        navigator.platform.startsWith('Mac') ? 'Meta' : 'Control',
    )) as 'Meta' | 'Control';
    await page.keyboard.down(additiveModifier);
    await page.mouse.click(secondEdgePoint.x, secondEdgePoint.y);
    await page.keyboard.up(additiveModifier);
    await waitForTwoAnimationFrames();
    await expectScreenshot({screenshotName: 'ComponentMap edges selected', skipTheme: 'dark'});
});
