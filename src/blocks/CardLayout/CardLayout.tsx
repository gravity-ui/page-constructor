import * as React from 'react';

import isEmpty from 'lodash/isEmpty';

import {AnimateBlock, BackgroundImage, Title} from '../../components';
import ChildrenItemWrap from '../../components/editor/ChildrenItemWrap/ChildrenItemWrap';
import ChildrensWrap from '../../components/editor/ChildrensWrap/ChildrensWrap';
import {useTheme} from '../../gravity-blocks/context/theme';
import {Col, Grid, GridColumnSizesType, GridJustifyContent, Row} from '../../gravity-blocks/grid';
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
            <Grid>
                {(title || description) && (
                    <Title
                        title={title}
                        subtitle={description}
                        className={b('title', {centered}, titleClassName)}
                        colJustifyContent={
                            centered ? GridJustifyContent.Center : GridJustifyContent.Start
                        }
                    />
                )}
                <div
                    className={b('content', {
                        'with-background': !isEmpty(background),
                    })}
                >
                    <BackgroundImage className={b('image', {border})} {...backgroundImageProps} />
                    <ChildrensWrap>
                        <Row>
                            {React.Children.map(children, (child, index) => (
                                <Col key={index} sizes={colSizes} className={b('item')}>
                                    <ChildrenItemWrap className={b('item-wrap')} index={index}>
                                        {child}
                                    </ChildrenItemWrap>
                                </Col>
                            ))}
                        </Row>
                    </ChildrensWrap>
                </div>
            </Grid>
        </AnimateBlock>
    );
};

export default CardLayout;
