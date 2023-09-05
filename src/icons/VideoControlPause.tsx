import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const VideoControlPause: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <g opacity="0.9">
                <mask
                    id="path-1-outside-1_1237_523"
                    maskUnits="userSpaceOnUse"
                    x="1"
                    y="0"
                    width="22"
                    height="24"
                    fill="black"
                >
                    <rect fill="white" x="1" width="22" height="24" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 1C2.89543 1 2 1.89543 2 3V21C2 22.1046 2.89543 23 4 23H8C9.10457 23 10 22.1046 10 21V3C10 1.89543 9.10457 1 8 1H4ZM16 1C14.8954 1 14 1.89543 14 3V21C14 22.1046 14.8954 23 16 23H20C21.1046 23 22 22.1046 22 21V3C22 1.89543 21.1046 1 20 1H16Z"
                    />
                </mask>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 1C2.89543 1 2 1.89543 2 3V21C2 22.1046 2.89543 23 4 23H8C9.10457 23 10 22.1046 10 21V3C10 1.89543 9.10457 1 8 1H4ZM16 1C14.8954 1 14 1.89543 14 3V21C14 22.1046 14.8954 23 16 23H20C21.1046 23 22 22.1046 22 21V3C22 1.89543 21.1046 1 20 1H16Z"
                    fill="white"
                />
                <path
                    d="M3 3C3 2.44772 3.44771 2 4 2V0C2.34315 0 1 1.34314 1 3H3ZM3 21V3H1V21H3ZM4 22C3.44772 22 3 21.5523 3 21H1C1 22.6569 2.34315 24 4 24V22ZM8 22H4V24H8V22ZM9 21C9 21.5523 8.55229 22 8 22V24C9.65685 24 11 22.6569 11 21H9ZM9 3V21H11V3H9ZM8 2C8.55228 2 9 2.44772 9 3H11C11 1.34315 9.65685 0 8 0V2ZM4 2H8V0H4V2ZM15 3C15 2.44772 15.4477 2 16 2V0C14.3431 0 13 1.34314 13 3H15ZM15 21V3H13V21H15ZM16 22C15.4477 22 15 21.5523 15 21H13C13 22.6569 14.3431 24 16 24V22ZM20 22H16V24H20V22ZM21 21C21 21.5523 20.5523 22 20 22V24C21.6569 24 23 22.6569 23 21H21ZM21 3V21H23V3H21ZM20 2C20.5523 2 21 2.44772 21 3H23C23 1.34315 21.6569 0 20 0V2ZM16 2H20V0H16V2Z"
                    fill="black"
                    fillOpacity="0.15"
                    mask="url(#path-1-outside-1_1237_523)"
                />
            </g>
        </svg>
    );
};
