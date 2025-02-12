import {render, screen} from '@testing-library/react';

import {testCustomClassName, testCustomStyle} from '../../../../test-utils/shared/common';
import {testSourceProps} from '../../../../test-utils/shared/image';
import {BackgroundImageProps} from '../../../models';
import {getQaAttrubutes} from '../../../utils';
import BackgroundImage from '../BackgroundImage';

const qa = 'background-image-component';

const imageSrc = '/mock.png';

const qaAttributes = getQaAttrubutes(qa, 'image-desktop-source-compressed');

describe('BackgroundImage', () => {
    test('Render BackgroundImage by default', async () => {
        render(<BackgroundImage qa={qa} />);

        const component = screen.getByTestId(qa);
        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('add image as src prop', () => {
        testSourceProps<BackgroundImageProps>({
            component: BackgroundImage,
            props: {src: imageSrc, qa},
            options: {qaId: qaAttributes.imageDesktopSourceCompressed},
        });
    });

    test('add image as desktop prop', () => {
        testSourceProps<BackgroundImageProps>({
            component: BackgroundImage,
            props: {desktop: imageSrc, qa},
            options: {qaId: qaAttributes.imageDesktopSourceCompressed},
        });
    });

    test('should hide image', () => {
        render(<BackgroundImage src={imageSrc} hide qa={qa} />);
        const component = screen.getByTestId(qa);
        const imageComponent = screen.queryByRole('img');

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
        expect(imageComponent).not.toBeInTheDocument();
    });

    test('should render children', () => {
        const childText = 'child-component';
        render(
            <BackgroundImage src={imageSrc} hide qa={qa}>
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
            props: {qa},
        });
    });

    test('add style', () => {
        testCustomStyle<BackgroundImageProps>({
            component: BackgroundImage,
            props: {qa},
        });
    });

    test('add className to image', () => {
        const className = 'my-class';

        render(<BackgroundImage src={imageSrc} imageClassName={className} />);
        const component = screen.getByRole('img');

        expect(component).toHaveClass(className);
    });
});
