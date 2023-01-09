import React from 'react';

import {block} from '../../utils';
import {
    HeaderComponentProps as HeaderComponentParams,
    TitleProps,
    ClassNameProps,
} from '../../models';
import {Col, GridColumnSizesType} from '../../grid';
import {Title} from '../';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import './HeaderComponent.scss';

const b = block('header-component');

export interface HeaderComponentProps extends HeaderComponentParams {
    colSizes?: GridColumnSizesType;
}

const HeaderComponent = ({
    title,
    description,
    className,
    colSizes = {all: 12, sm: 8},
}: HeaderComponentProps & ClassNameProps) => {
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

export default HeaderComponent;
