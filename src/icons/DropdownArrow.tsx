import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const DropdownArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            d="M1.5 1.5 6 6l4.5-4.5"
            stroke="#000"
            strokeOpacity=".85"
            strokeWidth="1.4"
            strokeLinecap="square"
        />
    </svg>
);
