export enum GridJustifyContent {
    Start = 'justify-content-start',
    Center = 'justify-content-center',
    End = 'justify-content-end',
    Around = 'justify-content-around',
    Between = 'justify-content-between',
}

export enum GridAlignItems {
    Start = 'align-items-start',
    Center = 'align-items-center',
    End = 'align-items-end',
}

export enum GridColumnSize {
    Sm = 'sm',
    Md = 'md',
    Lg = 'lg',
    Xl = 'xl',
    All = 'all',
}

export enum GridColumnAlignSelf {
    Start = 'align-self-start',
    Center = 'align-self-center',
    End = 'align-self-end',
}

export enum GridColumnClassPrefix {
    Col = 'col',
    Offset = 'offset',
    Order = 'order',
}

export enum GridColumnVisibilityClass {
    None = 'none',
    Block = 'block',
}

export enum GridColumnOrderClasses {
    First = 'first',
    Last = 'last',
}

export type GridColumnSizesType = Partial<Record<GridColumnSize, number>>;
export type GridColumnOrderSizesType = Partial<
    Record<GridColumnSize, number | GridColumnOrderClasses>
>;

export interface GridColumnClassParams {
    className?: string;
    sizes?: GridColumnSizesType | number;
    offsets?: GridColumnSizesType;
    orders?: GridColumnOrderSizesType;
    hidden?: GridColumnSize;
    visible?: GridColumnSize;
    alignSelf?: GridColumnAlignSelf;
    justifyContent?: GridJustifyContent;
    reset?: boolean;
}
