import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const PreviewClose: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        stroke="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            strokeWidth="2"
            strokeLinecap="round"
            d="M7.357 7.357l9.286 9.286m0-9.286l-9.286 9.286"
        />
    </svg>
);
