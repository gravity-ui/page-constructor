import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const Mute: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="27"
            height="22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path
                d="M20 7a5.657 5.657 0 0 1 0 8m3-11c3.866 3.866 3.866 10.134 0 14"
                stroke="#262626"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m7 7 7-7h2v22h-2l-7-7H0V7h7z"
                fill="#262626"
            />
        </svg>
    );
};
