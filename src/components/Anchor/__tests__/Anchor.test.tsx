import React from 'react';

import {render, screen} from '@testing-library/react';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import Anchor, {AnchorProps} from '../Anchor';

const testId = 'anchor';
const anchorId = 'anchorId';

describe('Anchor', () => {
    test('Has id', async () => {
        render(<Anchor id={anchorId} qa={testId} />);
        const anchor = screen.getByTestId(testId);
        expect(anchor).toHaveAttribute('id', anchorId);
    });

    test('Has custom class', async () => {
        testCustomClassName<AnchorProps>({
            component: Anchor,
            props: {id: anchorId, qa: testId},
        });
    });
});
