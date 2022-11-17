import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const NavigationClose: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="none"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            d="M26 10 10 26m16 0L10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);
