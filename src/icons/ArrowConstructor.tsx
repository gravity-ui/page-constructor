import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const ArrowConstructor: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="42"
        viewBox="0 0 19 42"
        fill="none"
        stroke="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path d="M18 41 2 21 18 1" strokeWidth="2" />
    </svg>
);
