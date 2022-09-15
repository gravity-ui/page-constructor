import {FC, PropsWithChildren} from 'react';

// Custom Type for a React functional component with props and children
export type ReactFCC<P = {}> = FC<PropsWithChildren<P>>;
// Custom Type for a React class component with props and children
