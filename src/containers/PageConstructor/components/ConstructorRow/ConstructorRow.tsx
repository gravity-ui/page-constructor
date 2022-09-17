import React from 'react';
import {Col, Row} from '../../../../grid';
import {block} from '../../../../utils';
import {WithChildren} from '../../../../models';

import './ConstructorRow.scss';

const b = block('constructor-row');

export const ConstructorRow = ({children}: WithChildren<{}>) =>
    children ? (
        <Row className={b()}>
            <Col>{children}</Col>
        </Row>
    ) : null;
