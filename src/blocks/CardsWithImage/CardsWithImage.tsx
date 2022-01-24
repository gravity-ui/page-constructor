import React from 'react';

import {block} from '../../utils';
import {CardsWithImageBlockProps} from '../../models';
import {Row, Col} from '../../grid';
import {BlockHeader} from '../../components';
import CardWithImage from '../../components/CardWithImage/CardWithImage';

const b = block('cards-with-image-block');

const DEFAULT_SIZES = {
    all: 12,
    sm: 6,
    md: 4,
};

const CardsWithImage: React.FC<CardsWithImageBlockProps> = ({
    title,
    description,
    cards,
    colSizes = DEFAULT_SIZES,
}) => (
    <div className={b()}>
        <BlockHeader className={b('header')} title={title} description={description} />
        <div className={b('items')}>
            <Row>
                {cards.map((card, i) => (
                    <Col className={b('item')} key={i} sizes={colSizes}>
                        <CardWithImage {...card} key={card.image} />
                    </Col>
                ))}
            </Row>
        </div>
    </div>
);

export default CardsWithImage;
