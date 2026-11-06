import {act, fireEvent, render, screen, within} from '@testing-library/react';

import {ThemeContext} from '../../../context/theme';
import {CompaniesBlockProps, Theme} from '../../../models';
import Strip from '../Strip';

const qa = 'strip';
let resizeObserverCallback: ResizeObserverCallback;

const setElementWidth = (
    element: HTMLElement,
    property: 'clientWidth' | 'scrollWidth',
    value: number,
) => {
    Object.defineProperty(element, property, {configurable: true, value});
};

describe('Strip', () => {
    beforeEach(() => {
        window.ResizeObserver = class ResizeObserverMock implements ResizeObserver {
            constructor(callback: ResizeObserverCallback) {
                resizeObserverCallback = callback;
            }

            disconnect() {}
            observe() {}
            unobserve() {}
        };
    });

    test('does not render an empty card list', () => {
        render(<Strip qa={qa} />);

        expect(screen.queryByTestId(qa)).not.toBeInTheDocument();
    });

    test('renders a wrapping card list with configured spacing and column sizes', () => {
        render(
            <Strip
                title="Card strip"
                gap={24}
                itemHeight={160}
                colSizes={{all: 12, sm: 6, md: 4}}
                qa={qa}
            >
                <article>Card</article>
            </Strip>,
        );

        expect(screen.getByRole('article')).toHaveTextContent('Card');
        expect(screen.getByRole('heading', {name: 'Card strip', level: 2})).toHaveClass(
            'pc-title-item_size_m',
            'pc-title-item_justify_center',
        );
        expect(screen.getByTestId(qa)).toHaveClass(
            'pc-strip-block_layout_wrap',
            'pc-strip-block_with-col-sizes',
        );
        expect(screen.getByTestId(qa)).toHaveStyle({
            '--pc-strip-gap': '24px',
            '--pc-strip-item-height': '160px',
        });
        expect(screen.getByRole('listitem')).toHaveStyle({
            '--pc-strip-col-size-all': '12',
            '--pc-strip-col-size-sm': '6',
            '--pc-strip-col-size-md': '4',
            '--pc-strip-col-size-lg': '4',
            '--pc-strip-col-size-xl': '4',
        });
    });

    test('renders themed responsive images without a card wrapper', () => {
        render(
            <ThemeContext.Provider value={{theme: Theme.Dark}}>
                <Strip
                    itemHeight="auto"
                    color="text-color"
                    images={[
                        {
                            image: {
                                light: {
                                    desktop: '/desktop-light.svg',
                                    tablet: '/tablet-light.svg',
                                    mobile: '/mobile-light.svg',
                                    alt: 'Logos',
                                },
                                dark: {
                                    desktop: '/desktop-dark.svg',
                                    tablet: '/tablet-dark.svg',
                                    mobile: '/mobile-dark.svg',
                                    alt: 'Logos',
                                },
                            },
                            url: '#',
                        },
                    ]}
                    qa={qa}
                />
            </ThemeContext.Provider>,
        );

        expect(screen.getByRole('img', {name: 'Logos'})).toHaveClass('pc-strip-block__image');
        expect(screen.getByRole('img', {name: 'Logos'})).toHaveAttribute(
            'src',
            '/desktop-dark.svg',
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '#');
        expect(screen.getByTestId(`${qa}-colorized-image-0`)).toHaveClass(
            'pc-strip-block__colorized-image',
        );
        expect(screen.getByTestId(`${qa}-colorized-image-0`)).toHaveStyle({
            '--pc-strip-image-mask-desktop': 'url("/desktop-dark.svg")',
            '--pc-strip-image-mask-tablet': 'url("/tablet-dark.svg")',
            '--pc-strip-image-mask-mobile': 'url("/mobile-dark.svg")',
        });
        expect(screen.getByTestId(qa)).toHaveStyle({'--pc-strip-item-height': 'auto'});
        expect(screen.getByTestId(`${qa}-image-0-mobile-source`)).toHaveAttribute(
            'srcset',
            '/mobile-dark.svg',
        );
        expect(screen.getByTestId(`${qa}-image-0-mobile-source`)).toHaveAttribute(
            'media',
            '(max-width: 577px)',
        );
        expect(screen.getByTestId(`${qa}-image-0-tablet-source`)).toHaveAttribute(
            'srcset',
            '/tablet-dark.svg',
        );
        expect(screen.getByTestId(`${qa}-image-0-tablet-source`)).toHaveAttribute(
            'media',
            '(max-width: 769px) and (min-width: 577px)',
        );
    });

    test.each([Theme.Light, Theme.Dark])(
        'accepts the Companies image contract in %s theme',
        (theme) => {
            const images: CompaniesBlockProps['images'] = {
                light: {
                    desktop: '/desktop-light.svg',
                    tablet: '/tablet-light.svg',
                    mobile: '/mobile-light.svg',
                    alt: 'Company logos',
                },
                dark: {
                    desktop: '/desktop-dark.svg',
                    tablet: '/tablet-dark.svg',
                    mobile: '/mobile-dark.svg',
                    alt: 'Company logos',
                },
            };

            render(
                <ThemeContext.Provider value={{theme}}>
                    <Strip images={images} qa={qa} />
                </ThemeContext.Provider>,
            );

            expect(screen.getAllByRole('listitem')).toHaveLength(1);
            expect(screen.getByRole('img', {name: 'Company logos'})).toHaveAttribute(
                'src',
                `/desktop-${theme}.svg`,
            );
            expect(screen.getByTestId(`${qa}-image-0-tablet-source`)).toHaveAttribute(
                'srcset',
                `/tablet-${theme}.svg`,
            );
            expect(screen.getByTestId(`${qa}-image-0-mobile-source`)).toHaveAttribute(
                'srcset',
                `/mobile-${theme}.svg`,
            );
        },
    );

    test('accepts a Companies image without theme variants', () => {
        render(<Strip images={{desktop: '/logos.svg', alt: 'Company logos'}} />);

        expect(screen.getByRole('img', {name: 'Company logos'})).toHaveAttribute(
            'src',
            '/logos.svg',
        );
    });

    test('keeps short marquee content static', () => {
        render(
            <Strip layout="marquee" qa={qa}>
                <article>Card</article>
            </Strip>,
        );

        setElementWidth(screen.getByTestId(`${qa}-viewport`), 'clientWidth', 200);
        setElementWidth(screen.getByTestId(`${qa}-list`), 'scrollWidth', 100);

        act(() => resizeObserverCallback([], {} as ResizeObserver));

        expect(screen.getAllByRole('article')).toHaveLength(1);
        expect(screen.queryByTestId(`${qa}-duplicate-list`)).not.toBeInTheDocument();
        expect(screen.getByTestId(qa)).not.toHaveClass('pc-strip-block_marquee-active');
        expect(screen.getByTestId(qa)).toHaveStyle({'--pc-strip-item-height': '48px'});
    });

    test('keeps the duplicate clickable without exposing it to keyboard navigation', () => {
        const handleClick = jest.fn();

        render(
            <Strip layout="marquee" duration={30} pauseOnHover qa={qa}>
                <a
                    href="/card"
                    onClick={(event) => {
                        event.preventDefault();
                        handleClick();
                    }}
                >
                    Card
                </a>
            </Strip>,
        );

        setElementWidth(screen.getByTestId(`${qa}-viewport`), 'clientWidth', 100);
        setElementWidth(screen.getByTestId(`${qa}-list`), 'scrollWidth', 200);

        act(() => resizeObserverCallback([], {} as ResizeObserver));

        const duplicateList = screen.getByTestId(`${qa}-duplicate-list`);
        const duplicateLink = within(duplicateList).getByRole('link', {hidden: true});

        expect(screen.getAllByText('Card')).toHaveLength(2);
        expect(screen.getAllByRole('link')).toHaveLength(1);
        expect(duplicateList).toHaveAttribute('aria-hidden', 'true');
        expect(duplicateList).not.toHaveAttribute('inert');
        expect(duplicateLink).toHaveAttribute('tabindex', '-1');

        fireEvent.click(duplicateLink as HTMLAnchorElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId(qa)).toHaveClass(
            'pc-strip-block_layout_marquee',
            'pc-strip-block_marquee-active',
            'pc-strip-block_pause-on-hover',
        );
        expect(screen.getByTestId(qa)).toHaveStyle({'--pc-strip-duration': '30s'});
    });
});
