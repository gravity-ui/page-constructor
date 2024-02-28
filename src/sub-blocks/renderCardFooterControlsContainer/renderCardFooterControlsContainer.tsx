import React from 'react';

import {CardBase} from '../../components';
import {block} from '../../utils';

const b = block('card-footer-controls-containe');

const renderCardFooterControlsContainer = (children: React.ReactElement) => (
    <CardBase.Footer className={b()}>{children}</CardBase.Footer>
);

export default renderCardFooterControlsContainer;
