import React, {ReactElement, useMemo} from 'react';

import {
    Col,
    GridColumnOrderSizesType,
    GridColumnSizesType,
    Row,
} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';

import {PaddingsDirections, PaddingsYFMProps} from '../../models/paddings';

import {block} from '../../utils/cn';

import './Layout.scss';

const b = block('layout');

export type LayoutProps = {
    fullWidth?: boolean;
    mobileOrder?: string;
    children: ReactElement[];
} & PaddingsYFMProps;

type ColLayouts = {
    sizes: GridColumnSizesType;
    offsets?: GridColumnSizesType;
    orders?: GridColumnOrderSizesType;
};

type LayoutType = {
    leftCol: ColLayouts;
    rightCol: ColLayouts;
};

type SortedLayoutItems = {
    left: ReactElement[];
    right: ReactElement[];
};

export const Layout: React.FC<LayoutProps> = ({
    fullWidth,
    mobileOrder,
    children,
    paddingTop = 'xs',
    paddingBottom = 'xs',
}) => {
    const layout: LayoutType = useMemo(() => {
        const layoutConfig: LayoutType = {
            leftCol: {
                sizes: {all: 12, lg: 8},
                orders: {all: 1, lg: 1},
            },
            rightCol: {
                sizes: {all: 12, lg: 3},
                offsets: {
                    all: 0,
                    lg: 1,
                },
                orders: {all: 2, lg: 2},
            },
        };

        if (fullWidth) {
            layoutConfig.leftCol.sizes = {all: 12};
            layoutConfig.rightCol.sizes = {all: 12};
            layoutConfig.rightCol.offsets = {all: 0};
        }

        if (mobileOrder === 'reverse') {
            layoutConfig.leftCol.orders = {all: 3, lg: 1};
        }

        return layoutConfig;
    }, [fullWidth, mobileOrder]);

    const renderChildren = (blockChildren: React.ReactChild[]) =>
        React.Children.map(blockChildren, (child, i) => (
            <div key={i} className={b('item')}>
                {child}
            </div>
        ));

    const {left, right} = useMemo(
        () =>
            children?.reduce(
                (sortedChildren: SortedLayoutItems, child: ReactElement) => {
                    if (child?.props?.data?.column === 'left') {
                        sortedChildren.left.push(child);
                    } else {
                        sortedChildren.right.push(child);
                    }
                    return sortedChildren;
                },
                {left: [], right: []},
            ),
        [children],
    );

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
            <Row className={b('row')} noGutter>
                <Col className={b('left-col')} {...layout.leftCol}>
                    {left && renderChildren(left)}
                </Col>
                <Col className={b('right-col')} {...layout.rightCol}>
                    {right && renderChildren(right)}
                </Col>
            </Row>
        </Wrapper>
    );
};
