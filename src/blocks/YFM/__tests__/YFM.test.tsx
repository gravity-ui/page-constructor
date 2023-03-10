import React from 'react';
import {render, screen} from '@testing-library/react';

import {YFM} from '../YFM';

const text = 'YFM block';

describe('YFM', () => {
    test('Has id', async () => {
        render(<YFM text={text} />);
        const yfm = screen.getByText(text);
        expect(yfm).toHaveClass('yfm');
    });
});
