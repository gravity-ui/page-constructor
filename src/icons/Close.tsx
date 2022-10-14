import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const Close: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            d="M10 0.7L9.3 0L5 4.3L0.7 0L0 0.7L4.3 5L0 9.3L0.7 10L5 5.7L9.3 10L10 9.3L5.7 5L10 0.7Z"
            fill="currentColor"
        />
    </svg>
);
