import React from 'react';

import {block} from '../../utils';
import {BlockHeaderProps as BlockHeaderParams, TitleProps, ClassNameProps} from '../../models';
import {Col, GridColumnSizesType} from '../../grid';
import {Title} from '../';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import './BlockHeader.scss';

const b = block('block-header');

export interface BlockHeaderProps extends BlockHeaderParams {
    colSizes?: GridColumnSizesType;
}

const BlockHeader = ({
    title,
    description,
    className,
    colSizes = {all: 12, sm: 8},
}: BlockHeaderProps & ClassNameProps) => {
    if (!title && !description) {
        return null;
    }

    const {text, ...titleProps} =
        !title || typeof title === 'string' ? ({text: title} as TitleProps) : title;

    return (
        <div className={b(null, className)}>
            {text && (
                <Col reset sizes={colSizes}>
                    <Title text={text} {...titleProps} />
                </Col>
            )}
            {description && (
                <Col reset sizes={colSizes}>
                    <div className={b('description', {titleSize: titleProps?.textSize})}>
                        <YFMWrapper content={description} modifiers={{constructor: true}} />
                    </div>
                </Col>
            )}
        </div>
    );
};

export default BlockHeader;
