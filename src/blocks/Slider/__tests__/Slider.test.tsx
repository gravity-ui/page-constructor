import {render} from '@testing-library/react';

import {BasicCard} from '../../../sub-blocks';
import Slider from '../Slider';

const EXAMPLE_URL = 'https://example.com';
const SLIDER_TITLE = 'Slider title';
const CARD_TITLE = 'Card title';
const CARD_TEXT = 'Lorem ipsum';
const SLIDES_TO_SHOW = 3;
const CARDS_COUNTS = [1, 3, 5, 10];

describe('Slider', () => {
    test.each(CARDS_COUNTS)('Has correct slider slides', async (cardCount) => {
        const {container} = render(
            <Slider
                title={{text: SLIDER_TITLE, url: EXAMPLE_URL}}
                slidesToShow={SLIDES_TO_SHOW}
                dots
            >
                {Array(cardCount)
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
        const slides = container.querySelectorAll('.pc-SliderBlock__slide');
        expect(slides.length).toEqual(cardCount);
    });

    test('Slider has no arrows', () => {
        const {container} = render(
            <Slider
                title={{text: SLIDER_TITLE, url: EXAMPLE_URL}}
                slidesToShow={SLIDES_TO_SHOW}
                dots
                arrows={false}
            >
                {Array(3)
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
        const arrow = container.querySelector('.pc-SliderBlock__arrow');
        expect(arrow).toBeFalsy();
    });
});
