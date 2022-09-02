import React, {ReactElement, useMemo} from 'react';
import block from 'bem-cn-lite';

import {
    Col,
    GridColumnOrderSizesType,
    GridColumnSizesType,
    Row,
} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';

import './BlogLayout.scss';

const b = block('BlogLayout');

export type BlogLayoutProps = {
    fullWidth?: boolean;
    mobileOrder?: string;
    children: ReactElement[];
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

type ColLayouts = {
    sizes: GridColumnSizesType;
    offsets?: GridColumnSizesType;
    orders?: GridColumnOrderSizesType;
};

type Layout = {
    leftCol: ColLayouts;
    rightCol: ColLayouts;
};

type SortedLayoutItems = {
    left: ReactElement[];
    right: ReactElement[];
};

export const BlogLayout: React.FC<BlogLayoutProps> = ({
    fullWidth,
    mobileOrder,
    children,
    paddingTop = 'xs',
    paddingBottom = 'xs',
}) => {
    const layout: Layout = useMemo(() => {
        const layoutConfig: Layout = {
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
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <Row className={b('row')} noGutter>
                <Col className={b('left-col')} {...layout.leftCol}>
                    {left && renderChildren(left)}
                </Col>
                <Col className={b('right-col')} {...layout.rightCol}>
                    {right && renderChildren(right)}
                </Col>
            </Row>
        </BlogWrapper>
    );
};
