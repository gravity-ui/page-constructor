import React from 'react';

import {Col, Row} from '../../../../grid';
import {WithChildren} from '../../../../models';
import {block} from '../../../../utils';

import './ConstructorRow.scss';

const b = block('constructor-row');

export const ConstructorRow = ({children}: WithChildren<{}>) =>
    children ? (
        <Row className={b()}>
            <Col>{children}</Col>
        </Row>
    ) : null;
