import React from 'react';

import {block} from '../../utils';
import {
    BlockHeaderProps as BlockHeaderParams,
    TitleProps,
    ClassNameProps,
    ReactFCC,
} from '../../models';
import {Col, GridColumnSizesType} from '../../grid';
import {Title, HTML} from '../';

import './BlockHeader.scss';

const b = block('BlockHeader');

export interface BlockHeaderProps extends BlockHeaderParams {
    colSizes?: GridColumnSizesType;
}

const BlockHeader: ReactFCC<BlockHeaderProps & ClassNameProps> = ({
    title,
    description,
    className,
    colSizes = {all: 12, sm: 8},
}) => {
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
                <Col reset sizes={{all: 12, sm: 8}}>
                    <div className={b('description', {titleSize: titleProps?.textSize})}>
                        <HTML>{description}</HTML>
                    </div>
                </Col>
            )}
        </div>
    );
};

export default BlockHeader;
