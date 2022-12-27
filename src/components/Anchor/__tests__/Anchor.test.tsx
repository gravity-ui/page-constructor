import React from 'react';
import {render, screen} from '@testing-library/react';

import Anchor from '../Anchor';

const testId = 'anc-hor';
const anchorId = 'anchorId';

describe('Anchor', () => {
    test('Has id', async () => {
        render(<Anchor id={anchorId} dataQa={testId} />);
        const anchor = screen.getByTestId(testId);
        expect(anchor).toHaveAttribute('id', anchorId);
    });

    test('Has custom class', async () => {
        const className = 'custom-anchor-class';
        render(<Anchor id={anchorId} className={className} dataQa={testId} />);
        const anchor = screen.getByTestId(testId);
        expect(anchor).toHaveClass(className);
    });
});
