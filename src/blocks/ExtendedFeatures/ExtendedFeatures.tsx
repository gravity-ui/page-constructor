import React from 'react';

import {block} from '../../utils';
import {ExtendedFeaturesProps} from '../../models';
import {Row, Col} from '../../grid';
import {Link, HTML, AnimateBlock, BlockHeader} from '../../components/';

import './ExtendedFeatures.scss';

const b = block('ExtendedFeaturesBlock');

const DEFAULT_SIZES = {
    all: 12,
    sm: 6,
    md: 4,
};

export const ExtendedFeaturesBlock: React.FunctionComponent<ExtendedFeaturesProps> = ({
    title,
    description,
    items,
    colSizes = DEFAULT_SIZES,
    animated,
}) => (
    <AnimateBlock className={b()} animate={animated}>
        <BlockHeader title={title} description={description} className={b('header')} />
        <div className={b('items')}>
            <Row>
                {items.map(({title: itemTitle, text, link, label, icon}) => (
                    <Col className={b('item')} key={text || itemTitle} sizes={colSizes}>
                        {icon && <img src={icon} className={b('icon')} />}
                        {itemTitle && (
                            <h5 className={b('item-title', {'has-label': Boolean(label)})}>
                                <HTML>{itemTitle}</HTML>
                                {label && <div className={b('item-label')}>{label}</div>}
                            </h5>
                        )}
                        {text && (
                            <div className={b('item-text')}>
                                <HTML>{text}</HTML>
                            </div>
                        )}
                        {link && <Link className={b('item-link')} {...link} />}
                    </Col>
                ))}
            </Row>
        </div>
    </AnimateBlock>
);

export default ExtendedFeaturesBlock;
