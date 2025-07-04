import * as React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path d="M19.644 6.675a4.247 4.247 0 0 0 1.803-2.362c-.793.49-1.67.844-2.606 1.036A4.016 4.016 0 0 0 15.846 4c-2.265 0-4.101 1.913-4.101 4.272 0 .335.034.66.104.973C8.44 9.066 5.417 7.367 3.392 4.78a4.397 4.397 0 0 0-.555 2.149c0 1.481.724 2.789 1.825 3.556a3.994 3.994 0 0 1-1.859-.534v.053c0 2.07 1.413 3.797 3.293 4.188-.345.1-.707.15-1.083.15-.264 0-.522-.025-.77-.075.52 1.696 2.036 2.933 3.832 2.966A8.028 8.028 0 0 1 2 19.004a11.29 11.29 0 0 0 6.29 1.92c7.548 0 11.673-6.51 11.673-12.156 0-.186-.002-.37-.01-.553A8.508 8.508 0 0 0 22 6.003c-.736.34-1.527.57-2.356.672z"></path>
    </svg>
);
