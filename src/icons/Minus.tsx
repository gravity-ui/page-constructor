import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const Minus: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="none"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            fill="#B5BFC6"
            fillRule="evenodd"
            d="M1.969 9c0-.466.378-.844.843-.844h12.376a.844.844 0 0 1 0 1.688H2.812A.844.844 0 0 1 1.97 9Z"
            clipRule="evenodd"
        />
    </svg>
);
