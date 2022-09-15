import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            d="M9.532 9.539A5 5 0 1 0 2.468 2.46a5 5 0 0 0 7.064 7.08zm0 0L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
        />
    </svg>
);
