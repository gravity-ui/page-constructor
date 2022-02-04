import React from 'react';

import {block} from '../../utils';
import {CardLayoutBlockProps} from '../../models';
import {Row, Col} from '../../grid';
import {BlockHeader} from '../../components';

const b = block('cards-layout-block');

const DEFAULT_SIZES = {
    all: 12,
    sm: 6,
    md: 4,
};

const CardLayout: React.FC<CardLayoutBlockProps> = ({
    title,
    description,
    colSizes = DEFAULT_SIZES,
    children,
}) => (
    <div className={b()}>
        <BlockHeader title={title} description={description} />
        <div>
            <Row>
                {children &&
                    React.Children.map(children, (child, i) => {
                        return (
                            <Col sizes={colSizes} key={i}>
                                {child}
                            </Col>
                        );
                    })}
            </Row>
        </div>
    </div>
);

export default CardLayout;
