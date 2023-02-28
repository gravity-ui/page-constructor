import React from 'react';

import {Title} from '../';
import {Col, GridColumnSizesType} from '../../grid';
import {BlockHeaderProps as BlockHeaderParams, ClassNameProps, TitleProps} from '../../models';
import {block} from '../../utils';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import './BlockHeader.scss';

const b = block('block-header');

export interface BlockHeaderProps extends BlockHeaderParams {
    colSizes?: GridColumnSizesType;
    qa?: string;
}

const BlockHeader = ({
    title,
    description,
    className,
    colSizes = {all: 12, sm: 8},
    qa,
}: BlockHeaderProps & ClassNameProps) => {
    if (!title && !description) {
        return null;
    }

    const {text, ...titleProps} =
        !title || typeof title === 'string' ? ({text: title} as TitleProps) : title;

    return (
        <div className={b(null, className)} data-qa={qa}>
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
