export interface RadioItem<T> {
    value: string;
    data: T;
}

export type PickKnownFieldProps<T extends {[K in 'input' | 'meta']: any}> = Pick<
    T,
    'input' | 'meta'
>;

export interface ClassNameProps {
    className?: string;
}
