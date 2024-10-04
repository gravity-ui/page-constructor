import React from 'react';

import {queryHelpers, render} from '@testing-library/react';

import {PageConstructorProvider} from '../../../containers/PageConstructor';
import {BasicCard} from '../../../sub-blocks';
import Slider from '../Slider';

const EXAMPLE_URL = 'https://example.com';
const SLIDER_TITLE = 'Slider title';
const CARD_TITLE = 'Card title';
const CARD_TEXT = 'Lorem ipsum';
const CARDS_COUNT = 10;

const slidesToShowValues = [3, 2, 1];

describe('Slider', () => {
    test.each(slidesToShowValues)('Has correct slider labels', async (slidesToShow) => {
        const {container} = render(
            <PageConstructorProvider>
                <Slider title={{text: SLIDER_TITLE, url: EXAMPLE_URL}} slidesToShow={slidesToShow}>
                    {Array(CARDS_COUNT)
                        .fill(null)
                        .map((_, index) => (
                            <BasicCard
                                url={EXAMPLE_URL}
                                title={CARD_TITLE}
                                text={CARD_TEXT}
                                key={index}
                            />
                        ))}
                </Slider>
            </PageConstructorProvider>,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const barElement = container.querySelector('.pc-SliderBlock__bar');
        if (slidesToShow > 1) {
            expect(barElement).toBeTruthy();
        } else {
            expect(barElement).toBeFalsy();
        }

        const barDotsCount = CARDS_COUNT - slidesToShow + 1;

        // Checking labels for the first slide
        // There we have a bar covering `slidesToShow` dots
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const accessibleBarElement = container.querySelector('.pc-SliderBlock__accessible-bar');
        expect(accessibleBarElement?.getAttribute('aria-label')).toBe(`Slide 1 of ${barDotsCount}`);
        expect(
            queryHelpers.queryAllByAttribute('aria-label', container, `Slide 1 of ${barDotsCount}`),
        ).toHaveLength(slidesToShow + 1);

        // Checking labels for the slides starting from 2
        Array(barDotsCount - 1)
            .fill(null)
            .forEach((_, index) => {
                expect(
                    queryHelpers.queryAllByAttribute(
                        'aria-label',
                        container,
                        `Slide ${index + 2} of ${barDotsCount}`,
                    ),
                ).toHaveLength(1);
            });
    });
});
