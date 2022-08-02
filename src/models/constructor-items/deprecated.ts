import {GridColumnSize, GridColumnSizesType} from '../../grid';
import {Childable} from './blocks';
import {Background, ColumnsCount, HeaderWidth, Justifyable, Themable} from './common';
import {SubBlock} from './sub-blocks';

export interface ContainerProps extends Childable, Justifyable {
    sizes?: GridColumnSizesType;
    hidden?: GridColumnSize;
    visible?: GridColumnSize;
    offsets?: GridColumnSizesType;
    sticky?: boolean;
}

export interface SectionProps extends ContainerProps, Themable {
    background?: Background;
    anchor?: string;
}

export interface FeaturesProps {
    border?: boolean;
    columns?: ColumnsCount;
    items: string[];
}

export interface HeaderProps extends Themable, Childable {
    title: string;
    image?: string;
    subtitle?: string;
    color?: string;
    background?: Background;
    width?: HeaderWidth;
    children?: SubBlock[];
}

export interface ImageBlockProps {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
}

export interface ScrollableProps extends Childable {
    itemOffset?: number;
}

export interface TabsProps extends Childable {
    titles: string[];
}
