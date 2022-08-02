import {Childable} from './blocks';
import {Background, HeaderWidth, Themable} from './common';
import {SubBlock} from './sub-blocks';

export interface HeaderProps extends Themable, Childable {
    title: string;
    image?: string;
    subtitle?: string;
    color?: string;
    background?: Background;
    width?: HeaderWidth;
    children?: SubBlock[];
}
