import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export const ArrowSidebar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <path
            d="M19.5 11H7.4l3.8-3.8c.4-.4.4-1 0-1.4s-1-.4-1.4 0L3.6 12l6.2 6.2c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L7.4 13h12.1c.6 0 1-.4 1-1s-.4-1-1-1z"
            fill="currentColor"
        />
    </svg>
);
