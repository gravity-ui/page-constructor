import React from 'react';
import {Col, Row} from '../../../../grid';
import {block} from '../../../../utils';
import {ReactFCC} from '../../../../models';

import './ConstructorRow.scss';

const b = block('constructor-row');

export const ConstructorRow: ReactFCC<{}> = ({children}) =>
    children ? (
        <Row className={b()}>
            <Col>{children}</Col>
        </Row>
    ) : null;
