import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const Tick: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <g clipPath="url(#a)">
            <path
                fill="#37F"
                fillRule="evenodd"
                d="M15.174 3.86a.844.844 0 0 1 .092 1.19l-6.75 7.874a.843.843 0 0 1-1.238.048L3.341 9.034a.844.844 0 1 1 1.193-1.193l3.293 3.293 6.157-7.183a.844.844 0 0 1 1.19-.092Z"
                clipRule="evenodd"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h18v18H0z" />
            </clipPath>
        </defs>
    </svg>
);
