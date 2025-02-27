import * as React from 'react';

import {a11yHiddenSvgProps} from '../../../utils/svg';

const DefaultPreview: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="150"
        height="76"
        viewBox="0 0 150 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...a11yHiddenSvgProps}
        {...props}
    >
        <rect x="1" y="1" width="148" height="74" rx="8" fill="white" />
        <rect
            x="14.7674"
            y="21.6512"
            width="28.3953"
            height="6.88372"
            rx="0.860465"
            fill="#E7E7E7"
        />
        <rect x="43.1628" y="21.6512" width="28.3953" height="6.88372" rx="0.860465" fill="white" />
        <rect
            x="14.7674"
            y="31.9767"
            width="56.7907"
            height="3.44186"
            rx="0.860465"
            fill="#E7E7E7"
        />
        <rect
            x="14.7675"
            y="37.1395"
            width="56.7907"
            height="3.44186"
            rx="0.860465"
            fill="#E7E7E7"
        />
        <rect
            x="14.7675"
            y="42.3023"
            width="56.7907"
            height="3.44186"
            rx="0.860465"
            fill="#E7E7E7"
        />
        <rect
            x="14.7674"
            y="49.186"
            width="18.9302"
            height="5.16279"
            rx="0.860465"
            fill="#E7E7E7"
        />
        <rect x="33.6977" y="49.186" width="18.9302" height="5.16279" rx="0.860465" fill="white" />
        <rect x="52.6279" y="49.186" width="18.9302" height="5.16279" rx="0.860465" fill="white" />
        <rect
            x="78.4418"
            y="9.60464"
            width="56.7907"
            height="56.7907"
            rx="5.16279"
            fill="currentColor"
        />
        <rect x="0.5" y="0.5" width="149" height="75" rx="8.5" stroke="black" strokeOpacity="0.1" />
    </svg>
);

export default DefaultPreview;
