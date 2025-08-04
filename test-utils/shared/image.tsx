import * as React from 'react';

import {render, screen} from '@testing-library/react';

import {getQaAttrubutes} from '../../src';
import {QAProps} from '../../src/models';
import {isCompressible} from '../../src/utils/imageCompress';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

export const testSourceProps = <T,>({
    component: Component,
    props,
    options,
}: {
    component: React.ElementType;
    props: T &
        QAProps & {
            src?: string;
            tablet?: string;
            desktop?: string;
            mobile?: string;
            disableCompress?: boolean;
        };
    options?: {
        qaId?: string;
    };
}) => {
    const src = props.src || props.desktop;
    if (!src) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }
    const qaId = options?.qaId;

    const qaAttributes = getQaAttrubutes(
        props.qa,
        'mobile-source-compressed',
        'mobile-source',
        'tablet-source-compressed',
        'tablet-source',
        'desktop-source-compressed',
    );

    const disableWebp = src && (props.disableCompress || !isCompressible(src));

    render(<Component {...props} />);

    const component = screen.queryByRole('img');
    expect(component).toHaveAttribute('src', src);

    if (disableWebp) {
        const sourceWebP = screen.queryByTestId(qaId || qaAttributes.desktopSourceCompressed);
        expect(sourceWebP).not.toBeInTheDocument();
    } else {
        const sourceWebP = screen.getByTestId(qaId || qaAttributes.desktopSourceCompressed);
        expect(sourceWebP).toHaveAttribute('srcset', src + '.webp');
    }

    if (props.tablet) {
        if (disableWebp) {
            const source = screen.getAllByTestId(qaId || qaAttributes.tabletSource);
            const sourceWebP = screen.queryByTestId(qaId || qaAttributes.tabletSourceCompressed);

            expect(source[0]).toHaveAttribute('srcset', props.tablet);
            expect(sourceWebP).not.toBeInTheDocument();
        } else {
            const source = screen.getAllByTestId(qaId || qaAttributes.tabletSource);
            const sourceWebP = screen.getByTestId(qaId || qaAttributes.tabletSourceCompressed);

            expect(source[0]).toHaveAttribute('srcset', props.tablet);
            expect(sourceWebP).toHaveAttribute('srcset', props.tablet + '.webp');
        }
    }

    if (props.mobile) {
        if (disableWebp) {
            const source = screen.getAllByTestId(qaId || qaAttributes.mobileSource);
            const sourceWebP = screen.queryByTestId(qaId || qaAttributes.mobileSourceCompressed);

            expect(source[0]).toHaveAttribute('srcset', props.mobile);
            expect(sourceWebP).not.toBeInTheDocument();
        } else {
            const source = screen.getAllByTestId(qaId || qaAttributes.mobileSource);
            const sourceWebP = screen.getByTestId(qaId || qaAttributes.mobileSourceCompressed);

            expect(source[0]).toHaveAttribute('srcset', props.mobile);
            expect(sourceWebP).toHaveAttribute('srcset', props.mobile + '.webp');
        }
    }
};
