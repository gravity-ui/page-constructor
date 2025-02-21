import * as React from 'react';

import {Col, Row} from '../../../../grid';
import {block} from '../../../../utils';

import './ConstructorRow.scss';

const b = block('constructor-row');

export const ConstructorRow = ({children}: React.PropsWithChildren<{}>) =>
    children ? (
        <Row className={b()}>
            <Col>{children}</Col>
        </Row>
    ) : null;
