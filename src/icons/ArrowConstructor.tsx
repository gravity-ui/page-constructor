import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function ArrowConstructor(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="42"
            viewBox="0 0 19 42"
            fill="none"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path d="M18 41 2 21 18 1" stroke="#333" strokeWidth="2" />
        </svg>
    );
}
