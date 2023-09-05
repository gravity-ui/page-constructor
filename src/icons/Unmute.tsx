import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const Unmute: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="29"
            height="22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m7 7 7-7h2v22h-2l-7-7H0V7h7z"
                fill="#262626"
            />
            <path d="m20 7 4 4m0 0-4 4m4-4 4-4m-4 4 4 4" stroke="#262626" strokeWidth="2" />
        </svg>
    );
};
