import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const NavigationOpen: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="none"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <rect x="8" y="10" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="8" y="17" width="20" height="2" rx="1" fill="currentColor" />
        <rect x="8" y="24" width="20" height="2" rx="1" fill="currentColor" />
    </svg>
);
