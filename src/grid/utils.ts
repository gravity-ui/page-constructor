import {
    GridColumnClassParams,
    GridColumnClassPrefix,
    GridColumnOrderSizesType,
    GridColumnSize,
    GridColumnSizesType,
    GridColumnVisibilityClass,
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
    if (size === GridColumnSize.All) {
        return getVisibilityClass(type);
    }

    const [oppositeClass, mainClass] =
        type === GridColumnVisibilityClass.None
            ? [GridColumnVisibilityClass.None, GridColumnVisibilityClass.Block]
            : [GridColumnVisibilityClass.Block, GridColumnVisibilityClass.None];

    return `${getVisibilityClass(mainClass)} ${getVisibilityClass(oppositeClass, size)}`;
}

export function getVisibleClasses(
    visible: GridColumnSize | Partial<Record<GridColumnSize, boolean>>,
): string {
    if (typeof visible === 'string') {
        return getVisibilityClasses(visible, GridColumnVisibilityClass.Block);
    }

    const breakpoints: GridColumnSize[] = [
        GridColumnSize.Sm,
        GridColumnSize.Md,
        GridColumnSize.Lg,
        GridColumnSize.Xl,
    ];

    const classes: string[] = [];

    const hasAnyFalse = breakpoints.some((bp) => visible[bp] === false);
    const hasAnyTrue = breakpoints.some((bp) => visible[bp] === true);

    if (!hasAnyFalse && !hasAnyTrue) {
        return '';
    }

    const baseVisible = visible[GridColumnSize.Sm] !== false;
    classes.push(
        baseVisible
            ? getVisibilityClass(GridColumnVisibilityClass.Block)
            : getVisibilityClass(GridColumnVisibilityClass.None),
    );

    let prevVisible = baseVisible;

    for (const bp of breakpoints) {
        const bpVisible = visible[bp] !== false;

        if (bpVisible !== prevVisible) {
            classes.push(
                bpVisible
                    ? getVisibilityClass(GridColumnVisibilityClass.Block, bp)
                    : getVisibilityClass(GridColumnVisibilityClass.None, bp),
            );
        }

        prevVisible = bpVisible;
    }

    return classes.join(' ');
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
        visible,
        alignSelf,
        justifyContent,
        reset,
    } = params;
    return [
        GridColumnClassPrefix.Col,
        alignSelf,
        justifyContent && getJustifyClass(justifyContent),
        sizes && getSizeClass(sizes),
        offsets && getOffsetClass(offsets),
        orders && getOrderClass(orders),
        visible && getVisibleClasses(visible),
        reset && getResetClass(),
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
