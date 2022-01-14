import React, {useContext} from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import {BlockHeaderProps as BlockHeaderParams, TitleProps} from '../../models';
import {Col, GridColumnSizesType} from '../../grid';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import Title from '../Title/Title';

import './BlockHeader.scss';
import {MobileContext} from '../../context/mobileContext';

const b = block('BlockHeader');

export interface BlockHeaderProps extends BlockHeaderParams {
    colSizes?: GridColumnSizesType;
}

const BlockHeader: React.FunctionComponent<BlockHeaderProps & ClassNameProps> = ({
    title,
    description,
    className,
    colSizes = {all: 12, sm: 8},
}) => {
    const isMobile = useContext(MobileContext);

    if (!title && !description) {
        return null;
    }

    const {text, ...titleProps} =
        !title || typeof title === 'string' ? ({text: title} as TitleProps) : title;

    return (
        <div className={b(null, className)}>
            {text && (
                <Col reset sizes={colSizes}>
                    <Title
                        text={text}
                        {...titleProps}
                        className={b('title', {'no-description': !description})}
                        arrowSize={isMobile ? 20 : 24}
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
