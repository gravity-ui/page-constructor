import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export const VideoControlPlay: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="24"
            height="26"
            viewBox="0 0 24 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path
                d="M20.5028 15.6408C22.4991 14.4663 22.4991 11.5337 20.5028 10.3592L6.99778 2.41411C4.99944 1.23846 2.5 2.70595 2.5 5.05488L2.5 20.9451C2.5 23.2941 4.99943 24.7615 6.99777 23.5859L20.5028 15.6408Z"
                fill="white"
            />
            <path
                d="M20.7563 16.0717C23.0812 14.7039 23.0812 11.2961 20.7563 9.92827L7.25131 1.98315C4.90651 0.603685 2 2.33458 2 5.05488L2 20.9451C2 23.6654 4.90651 25.3963 7.25131 24.0168L20.7563 16.0717Z"
                stroke="black"
                strokeOpacity="0.15"
            />
        </svg>
    );
};
