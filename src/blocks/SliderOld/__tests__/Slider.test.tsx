import {queryHelpers, render} from '@testing-library/react';

import {BasicCard} from '../../../sub-blocks';
import Slider from '../SliderOld';

const EXAMPLE_URL = 'https://example.com';
const SLIDER_TITLE = 'Slider title';
const CARD_TITLE = 'Card title';
const CARD_TEXT = 'Lorem ipsum';
const CARDS_COUNT = 10;

const slidesToShowValues = [3, 2, 1];

describe('Slider', () => {
    test.each(slidesToShowValues)('Has correct slider labels', async (slidesToShow) => {
        const {container} = render(
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
            </Slider>,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const barElement = container.querySelector('.pc-SliderOldBlock__bar');
        if (slidesToShow > 1) {
            expect(barElement).toBeTruthy();
        } else {
            expect(barElement).toBeFalsy();
        }

        const barDotsCount = CARDS_COUNT - slidesToShow + 1;

        // Checking labels for the first slide
        // There we have a bar covering `slidesToShow` dots
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const accessibleBarElement = container.querySelector('.pc-SliderOldBlock__accessible-bar');
        expect(accessibleBarElement?.getAttribute('aria-label')).toBe(`Page 1 of ${barDotsCount}`);
        expect(
            queryHelpers.queryAllByAttribute('aria-label', container, `Page 1 of ${barDotsCount}`),
        ).toHaveLength(slidesToShow + 1);

        // Checking labels for the slides starting from 2
        Array(barDotsCount - 1)
            .fill(null)
            .forEach((_, index) => {
                expect(
                    queryHelpers.queryAllByAttribute(
                        'aria-label',
                        container,
                        `Page ${index + 2} of ${barDotsCount}`,
                    ),
                ).toHaveLength(1);
            });
    });
});
