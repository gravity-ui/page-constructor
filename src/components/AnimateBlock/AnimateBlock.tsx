import React, {CSSProperties, useContext, useState} from 'react';
import {Waypoint} from 'react-waypoint';

import {AnimateContext, AnimateContextProps} from '../../context/animateContext/AnimateContext';
import {block} from '../../utils';
import {ReactFCC} from '../../models';

const b = block('AnimateBlock');

export interface AnimateBlockProps extends AnimateContextProps {
    animate?: boolean;
    offset?: number;
    className?: string;
    style?: CSSProperties;
    onScroll?: () => void;
}

const AnimateBlock: ReactFCC<AnimateBlockProps> = (props) => {
    const {animated} = useContext(AnimateContext);
    const {children, className, offset = 100, onScroll, style, animate = animated} = props;
    const [playAnimation, setPlayAnimation] = useState<boolean>(false);

    const divClassName = animate
        ? b(null, `${playAnimation && 'animate'} ${className}`)
        : className;
    return (
        <div className={divClassName} style={style}>
            <Waypoint
                // trigger animation if element is above screen
                topOffset={'-100000%'}
                bottomOffset={offset}
                onEnter={async () => {
                    setPlayAnimation(true);
                    if (onScroll) {
                        onScroll();
                    }
                }}
            />
            {children}
        </div>
    );
};

export default AnimateBlock;
