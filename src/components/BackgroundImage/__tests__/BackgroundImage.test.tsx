import React from 'react';

import {render, screen} from '@testing-library/react';
import {BackgroundImageProps} from 'src/models';

import {testCustomClassName, testCustomStyle} from '../../../../test-utils/shared/common';
import BackgroundImage from '../BackgroundImage';

const qaId = 'background-image-component';

const imageSrc =
    'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-gray.png';

describe('BackgroundImage', () => {
    test('Render BackgroundImage by default', async () => {
        render(<BackgroundImage qa={qaId} />);

        const component = screen.getByTestId(qaId);
        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('add image as src prop', () => {
        render(<BackgroundImage src={imageSrc} />);
        const component = screen.getByRole('img');

        expect(component).toHaveAttribute('src', imageSrc);
    });

    test('add image as desktop prop', () => {
        render(<BackgroundImage desktop={imageSrc} />);
        const component = screen.getByRole('img');

        expect(component).toHaveAttribute('src', imageSrc);
    });

    test('should hide image', () => {
        render(<BackgroundImage src={imageSrc} hide qa={qaId} />);
        const component = screen.getByTestId(qaId);
        const imageComponent = screen.queryByRole('img');

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
        expect(imageComponent).not.toBeInTheDocument();
    });

    test('should render children', () => {
        const childText = 'child-component';
        render(
            <BackgroundImage src={imageSrc} hide qa={qaId}>
                <p>{childText}</p>
            </BackgroundImage>,
        );
        const component = screen.getByText(childText);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('add className', () => {
        testCustomClassName<BackgroundImageProps>({
            component: BackgroundImage,
            props: {qa: qaId},
        });
    });

    test('add style', () => {
        testCustomStyle<BackgroundImageProps>({
            component: BackgroundImage,
            props: {qa: qaId},
        });
    });

    test('add className to image', () => {
        const className = 'my-class';

        render(<BackgroundImage src={imageSrc} imageClassName={className} />);
        const component = screen.getByRole('img');

        expect(component).toHaveClass(className);
    });
});
