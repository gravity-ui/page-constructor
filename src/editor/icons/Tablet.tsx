import * as React from 'react';

import {a11yHiddenSvgProps} from '../../utils/svg';

export const Tablet = (props: React.PropsWithChildren<React.SVGProps<SVGSVGElement>>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 3L10.5 11C10.5 11.8284 9.82843 12.5 9 12.5L3 12.5C2.17157 12.5 1.5 11.8284 1.5 11L1.5 3C1.5 2.17157 2.17157 1.5 3 1.5L9 1.5C9.82843 1.5 10.5 2.17157 10.5 3ZM9 -1.31134e-07C10.6569 -5.87108e-08 12 1.34315 12 3L12 11C12 12.6569 10.6569 14 9 14L3 14C1.34315 14 4.00426e-07 12.6569 4.72849e-07 11L8.2254e-07 3C8.94964e-07 1.34315 1.34315 -4.65826e-07 3 -3.93403e-07L9 -1.31134e-07ZM3.75 9.5C3.33579 9.5 3 9.83579 3 10.25C3 10.6642 3.33579 11 3.75 11L8.25 11C8.66421 11 9 10.6642 9 10.25C9 9.83579 8.66421 9.5 8.25 9.5L3.75 9.5Z"
            fill="currentColor"
            fillOpacity="0.85"
        />
    </svg>
);
