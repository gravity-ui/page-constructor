import * as React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const NavigationChevron = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 3L6 8L11 3L12 4L5.99997 10L-4.37114e-08 4L1 3Z"
        />
    </svg>
);
