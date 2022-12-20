export enum PaddingsDirections {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
}

export type PaddingSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type Paddings = {
    [key in PaddingsDirections]?: PaddingSize;
};
