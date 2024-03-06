import React from 'react';

import {test} from '../../../../playwright/core/index';
import Anchor from '../Anchor';

const testId = 'anchor';
const anchorId = 'anchorId';

test.describe('Anchor', () => {
    test('render anchor by default', async ({mount, expectScreenshot}) => {
        await mount(<Anchor id={anchorId} qa={testId} />);

        await expectScreenshot();
    });
});
