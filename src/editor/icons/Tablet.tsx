import React from 'react';

import {a11yHiddenSvgProps} from '../../utils/svg';

export const Tablet: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 4L12.5 12C12.5 12.8284 11.8284 13.5 11 13.5L5 13.5C4.17157 13.5 3.5 12.8284 3.5 12L3.5 4C3.5 3.17157 4.17157 2.5 5 2.5L11 2.5C11.8284 2.5 12.5 3.17157 12.5 4ZM11 1C12.6569 1 14 2.34315 14 4L14 12C14 13.6569 12.6569 15 11 15L5 15C3.34315 15 2 13.6569 2 12L2 4C2 2.34315 3.34315 1 5 1L11 1ZM5.75 10.5C5.33579 10.5 5 10.8358 5 11.25C5 11.6642 5.33579 12 5.75 12L10.25 12C10.6642 12 11 11.6642 11 11.25C11 10.8358 10.6642 10.5 10.25 10.5L5.75 10.5Z"
            fill="currentColor"
            fillOpacity="0.85"
        />
    </svg>
);
