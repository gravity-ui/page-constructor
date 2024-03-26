import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {TARGETS} from '../../../../test-utils/constants';
import {testCustomClassName} from '../../../../test-utils/shared/common';
import {PageConstructorProvider} from '../../../containers/PageConstructor';
import {AnalyticsContextProps} from '../../../context/analyticsContext';
import {MetrikaContextProps} from '../../../context/metrikaContext';
import {CardBorder, PixelEventType} from '../../../models';
import {getQaAttrubutes} from '../../../utils';
import CardBase, {CardBasePropsType} from '../CardBase';

const qaId = 'card-base-component';
const qaAttributes = getQaAttrubutes(qaId, 'header', 'footer', 'body', 'content');

const url = '#';

const borders: CardBorder[] = ['shadow', 'line', 'none'];

describe('CardBase', () => {
    test('render CardBase by default', async () => {
        render(
            <CardBase qa={qaId}>
                <CardBase.Content>Content</CardBase.Content>
            </CardBase>,
        );
        const cardBase = screen.getByTestId(qaId);

        expect(cardBase).toBeInTheDocument();
        expect(cardBase).toBeVisible();
        expect(cardBase).not.toBeDisabled();

        const aTag = screen.queryByRole('link');
        expect(aTag).not.toBeInTheDocument();
    });

    test('render CardBase by default as a link', async () => {
        render(
            <CardBase qa={qaId} url={url}>
                <CardBase.Content>Content</CardBase.Content>
            </CardBase>,
        );
        const cardBase = screen.queryByRole('link');

        expect(cardBase).toBeInTheDocument();
        expect(cardBase).toBeVisible();
        expect(cardBase).not.toBeDisabled();
    });

    test.each(new Array<React.HTMLAttributeAnchorTarget>(...TARGETS))(
        'render with given "%s" target',
        (target) => {
            render(
                <CardBase qa={qaId} url={url} target={target}>
                    <CardBase.Content>Content</CardBase.Content>
                </CardBase>,
            );
            const cardBase = screen.queryByRole('link');

            expect(cardBase).toHaveAttribute('target', target);
        },
    );

    test('add className', () => {
        const children = <CardBase.Content>text</CardBase.Content>;
        testCustomClassName<CardBasePropsType>({
            component: CardBase,
            props: {children, qa: qaId},
        });
    });

    test('render CardBase with header', async () => {
        render(
            <CardBase qa={qaId}>
                <CardBase.Header>Header</CardBase.Header>
            </CardBase>,
        );
        const cardBaseHeader = screen.queryByTestId(qaAttributes.header);

        expect(cardBaseHeader).toBeInTheDocument();
        expect(cardBaseHeader).toBeVisible();
        expect(cardBaseHeader).not.toBeDisabled();
    });

    test('render CardBase with content', async () => {
        render(
            <CardBase qa={qaId}>
                <CardBase.Content>Content</CardBase.Content>
            </CardBase>,
        );
        const cardBaseContent = screen.queryByTestId(qaAttributes.content);

        expect(cardBaseContent).toBeInTheDocument();
        expect(cardBaseContent).toBeVisible();
        expect(cardBaseContent).not.toBeDisabled();
    });

    test('render CardBase with footer', async () => {
        render(
            <CardBase qa={qaId}>
                <CardBase.Footer>Footer</CardBase.Footer>
            </CardBase>,
        );
        const cardBaseFooter = screen.queryByTestId(qaAttributes.footer);

        expect(cardBaseFooter).toBeInTheDocument();
        expect(cardBaseFooter).toBeVisible();
        expect(cardBaseFooter).not.toBeDisabled();
    });

    test('add bodyClassName', async () => {
        const bodyClassName = 'body-class-name';

        render(
            <CardBase bodyClassName={bodyClassName} qa={qaId}>
                <CardBase.Content>Content</CardBase.Content>
            </CardBase>,
        );
        const cardBaseBody = screen.queryByTestId(qaAttributes.body);

        expect(cardBaseBody).toHaveClass(bodyClassName);
    });

    test('add contentClassName', async () => {
        const contentClassName = 'content-class-name';

        render(
            <CardBase contentClassName={contentClassName} qa={qaId}>
                <CardBase.Content>Content</CardBase.Content>
            </CardBase>,
        );
        const cardBaseContent = screen.queryByTestId(qaAttributes.content);

        expect(cardBaseContent).toHaveClass(contentClassName);
    });

    test('add className to Header', async () => {
        const className = 'body-class-name';

        render(
            <CardBase qa={qaId}>
                <CardBase.Header className={className}>Header</CardBase.Header>
            </CardBase>,
        );

        const cardBaseHeader = screen.queryByTestId(qaAttributes.header);

        expect(cardBaseHeader).toHaveClass(className);
    });

    test('add className to Footer', async () => {
        const className = 'footer-class-name';

        render(
            <CardBase qa={qaId}>
                <CardBase.Footer className={className}>Footer</CardBase.Footer>
            </CardBase>,
        );
        const cardBaseFooter = screen.getByTestId(qaAttributes.footer);

        expect(cardBaseFooter).toHaveClass(className);
    });

    test.each(new Array<CardBorder>(...borders))('render with given "%s" border', (border) => {
        render(
            <CardBase border={border} qa={qaId}>
                <CardBase.Content>Content</CardBase.Content>
            </CardBase>,
        );
        const button = screen.getByTestId(qaId);

        expect(button).toHaveClass(`pc-card-base-block_border_${border}`);
    });

    test('add metrikaEvent', async () => {
        const metrikaContext: MetrikaContextProps = {
            metrika: {
                reachGoal: jest.fn(),
                reachGoals: jest.fn(),
            },
        };
        const user = userEvent.setup();

        render(
            <PageConstructorProvider metrika={metrikaContext}>
                <CardBase url={url} target={'_blank'} qa={qaId} metrikaGoals={'metrika-goal'}>
                    <CardBase.Content>Content</CardBase.Content>
                </CardBase>
            </PageConstructorProvider>,
        );
        const cardBase = screen.getByTestId(qaId);

        await user.click(cardBase);
        expect(metrikaContext.metrika?.reachGoals).toHaveBeenCalledTimes(1);
    });

    test('add pixelEvent', async () => {
        const metrikaContext: MetrikaContextProps = {
            pixel: {
                trackStandard: jest.fn(),
                trackCustom: jest.fn(),
                track: jest.fn(),
            },
        };
        const user = userEvent.setup();

        render(
            <PageConstructorProvider metrika={metrikaContext}>
                <CardBase
                    url={url}
                    target={'_blank'}
                    qa={qaId}
                    pixelEvents={[{name: PixelEventType.AddToCart}]}
                >
                    <CardBase.Content>Content</CardBase.Content>
                </CardBase>
            </PageConstructorProvider>,
        );
        const cardBase = screen.getByTestId(qaId);

        await user.click(cardBase);
        expect(metrikaContext.pixel?.track).toHaveBeenCalledTimes(1);
    });

    test('add analyticsEvent', async () => {
        const analyticsContext: AnalyticsContextProps = {
            sendEvents: jest.fn(),
        };
        const user = userEvent.setup();

        render(
            <PageConstructorProvider analytics={analyticsContext}>
                <CardBase url={url} target={'_blank'} qa={qaId} analyticsEvents={[{name: 'click'}]}>
                    <CardBase.Content>Content</CardBase.Content>
                </CardBase>
            </PageConstructorProvider>,
        );
        const cardBase = screen.getByTestId(qaId);

        await user.click(cardBase);
        expect(analyticsContext.sendEvents).toHaveBeenCalledTimes(1);
    });
});
