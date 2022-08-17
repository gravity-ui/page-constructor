import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function PlayVideo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="26"
            viewBox="0 0 22 26"
            fill="currentColor"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path d="M21 11.268c1.333.77 1.333 2.694 0 3.464L3 25.124c-1.333.77-3-.192-3-1.732V2.608C0 1.068 1.667.106 3 .876l18 10.392z" />
        </svg>
    );
}
