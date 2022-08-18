import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const Chevron: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        stroke="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path fill="none" d="M3 6l5 5 5-5" />
    </svg>
);
