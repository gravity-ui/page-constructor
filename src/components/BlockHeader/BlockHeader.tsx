import React from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import {BlockHeaderProps as BlockHeaderParams, TitleProps} from '../../models';
import {Col} from '../../grid';
import Title from '../Title/Title';

import './BlockHeader.scss';

const b = block('BlockHeader');

export interface BlockHeaderProps extends BlockHeaderParams {
    className?: string;
}

const BlockHeader: React.FunctionComponent<BlockHeaderProps> = ({
    title,
    description,
    className,
}) => {
    if (!title && !description) {
        return null;
    }

    const {text, ...titleProps} =
        !title || typeof title === 'string' ? ({text: title} as TitleProps) : title;

    return (
        <div className={b(null, className)}>
            {text && (
                <Col reset sizes={{all: 12, sm: 8}}>
                    <Title
                        text={text}
                        {...titleProps}
                        className={b('title', {'no-description': !description})}
                    />
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
