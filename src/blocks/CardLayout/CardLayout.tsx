import * as React from 'react';

import isEmpty from 'lodash/isEmpty';

import {AnimateBlock, BackgroundImage, Title} from '../../components';
import {useTheme} from '../../context/theme';
import {Col, GridColumnSizesType, GridJustifyContent, Row} from '../../grid';
import {CardLayoutBlockProps as CardLayoutBlockParams, ClassNameProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import './CardLayout.scss';

const DEFAULT_SIZES: GridColumnSizesType = {
    all: 12,
    sm: 6,
    md: 4,
};

export type CardLayoutBlockProps = React.PropsWithChildren<
    Omit<CardLayoutBlockParams, 'children'>
> &
    ClassNameProps;

const b = block('card-layout-block');

const CardLayout = ({
    title,
    description,
    animated,
    colSizes = DEFAULT_SIZES,
    children,
    className,
    titleClassName,
    background,
    centered = false,
}: CardLayoutBlockProps) => {
    const theme = useTheme();
    const {border, ...backgroundImageProps} = getThemedValue(background || {}, theme);
    return (
        <AnimateBlock className={b(null, className)} animate={animated}>
            {(title || description) && (
                <Title
                    title={title}
                    subtitle={description}
                    className={b('title', {centered}, titleClassName)}
                    colJustifyContent={
                        centered ? GridJustifyContent.Center : GridJustifyContent.Start
                    }
                    colSizes={{
                        all: 12,
                        sm: centered ? 12 : 8,
                    }}
                />
            )}
            <div
                className={b('content', {
                    'with-background': !isEmpty(background),
                })}
            >
                <BackgroundImage className={b('image', {border})} {...backgroundImageProps} />
                <Row>
                    {React.Children.map(children, (child, index) => (
                        <Col key={index} sizes={colSizes} className={b('item')}>
                            {child}
                        </Col>
                    ))}
                </Row>
            </div>
        </AnimateBlock>
    );
};

export default CardLayout;
