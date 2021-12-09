import {
    GridColumnSize,
    GridColumnVisibilityClass,
    GridColumnSizesType,
    GridColumnClassPrefix,
    GridColumnClassParams,
    GridColumnOrderSizesType,
    GridJustifyContent,
} from './types';

function getVisibilityClass(visibility: GridColumnVisibilityClass, size?: GridColumnSize) {
    return `d${size ? `-${size}` : ''}-${visibility}`;
}

export function getClasses(
    items: GridColumnSizesType | GridColumnOrderSizesType,
    prefix: GridColumnClassPrefix,
) {
    return Object.keys(items).reduce((result, size) => {
        const sizeName = size === GridColumnSize.All ? '' : `-${size}`;
        const itemSize = items[size as keyof GridColumnSizesType];
        const sizeValue = !itemSize && prefix === GridColumnClassPrefix.Col ? '' : `-${itemSize}`;

        return result + ` ${prefix}${sizeName}${sizeValue}`;
    }, '');
}

export function getOffsetClass(offsets: GridColumnSizesType) {
    return getClasses(offsets, GridColumnClassPrefix.Offset);
}

export function getOrderClass(orders: GridColumnOrderSizesType) {
    return getClasses(orders, GridColumnClassPrefix.Order);
}

export function getVisibilityClasses(size: GridColumnSize, type: GridColumnVisibilityClass) {
    const [oppositeClass, mainClass] =
        type === GridColumnVisibilityClass.None
            ? [GridColumnVisibilityClass.None, GridColumnVisibilityClass.Block]
            : [GridColumnVisibilityClass.Block, GridColumnVisibilityClass.None];

    return `${getVisibilityClass(mainClass)} ${getVisibilityClass(oppositeClass, size)}`;
}

export function getSizeClass(sizes: GridColumnSizesType | number): string {
    if (typeof sizes === 'number') {
        return `${GridColumnClassPrefix.Col}-${sizes.toString()}`;
    }

    return getClasses(sizes, GridColumnClassPrefix.Col);
}

export function getJustifyClass(justifyContent: GridJustifyContent): string {
    return `d-flex ${justifyContent}`;
}

export function getResetClass() {
    return 'col-reset';
}

export function getColClass(params: GridColumnClassParams) {
    const {
        className = '',
        sizes,
        offsets,
        orders,
        hidden,
        visible,
        alignSelf,
        justifyContent,
        reset,
    } = params;
    return [
        GridColumnClassPrefix.Col,
        className,
        alignSelf,
        justifyContent && getJustifyClass(justifyContent),
        sizes && getSizeClass(sizes),
        offsets && getOffsetClass(offsets),
        orders && getOrderClass(orders),
        hidden && getVisibilityClasses(hidden, GridColumnVisibilityClass.None),
        visible && getVisibilityClasses(visible, GridColumnVisibilityClass.Block),
        reset && getResetClass(),
    ]
        .filter(Boolean)
        .join(' ');
}
