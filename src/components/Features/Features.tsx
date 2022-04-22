import React from 'react';

import {block} from '../../utils';
import {FeaturesProps} from '../../models';
import {Row, Col} from '../../grid';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import './Features.scss';

const b = block('features-block');
const GRID_COLUMNS_COUNT = 12;

function getSizes(columns: number) {
    return {
        sm: GRID_COLUMNS_COUNT / columns,
        all: GRID_COLUMNS_COUNT,
    };
}

const Features: React.FunctionComponent<FeaturesProps> = ({columns = 2, items, border = true}) => (
    <Row className={b({columns: String(columns)})}>
        {items.map((item) => (
            <Col key={item} sizes={getSizes(columns)}>
                <div className={b('item', {border})}>
                    <YFMWrapper content={item} modifiers={{constructor: true}} />
                </div>
            </Col>
        ))}
    </Row>
);

export default Features;
