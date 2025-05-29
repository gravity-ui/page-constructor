import * as React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const NavigationArrow = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        fill="none"
        viewBox="0 0 9 9"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            d="M3 1H8M8 1V6M8 1L1 8"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="1.2"
            strokeLinecap="square"
        />
    </svg>
);
