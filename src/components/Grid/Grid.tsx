import React, {Children} from 'react';
import _ from 'lodash';

import {Row, Col, GridJustifyContent} from '../../grid';
import {Justify} from '../../models';

export interface GridProps {
    justify?: Justify;
}

function getJustify(justify?: Justify) {
    return justify && GridJustifyContent[_.capitalize(justify) as keyof typeof GridJustifyContent];
}

const GridBlock: React.FunctionComponent<GridProps> = ({children, justify}) =>
    children ? (
        <Row justifyContent={getJustify(justify)}>
            {Children.map(children, (child) => {
                if (!child) {
                    return null;
                }
                const sizes = _.get(child, 'props.sizes', {all: 12});
                const visible = _.get(child, 'props.visible');
                const hidden = _.get(child, 'props.hidden');
                const offsets = _.get(child, 'props.offsets');

                return (
                    <Col
                        sizes={sizes}
                        hidden={hidden}
                        visible={visible}
                        offsets={offsets}
                        justifyContent={getJustify(justify)}
                    >
                        {child}
                    </Col>
                );
            })}
        </Row>
    ) : null;

export default GridBlock;
