import * as React from 'react';

import {Waypoint} from 'react-waypoint';

import {AnimateContext, AnimateContextProps} from '../../context/animateContext/AnimateContext';
import {QAProps} from '../../models';
import {block} from '../../utils';

const b = block('AnimateBlock');

export interface AnimateBlockProps extends AnimateContextProps, QAProps {
    animate?: boolean;
    offset?: number;
    className?: string;
    style?: React.CSSProperties;
    onScroll?: () => void;
}

const AnimateBlock = (props: React.PropsWithChildren<AnimateBlockProps>) => {
    const {animated} = React.useContext(AnimateContext);
    const {children, className, offset = 100, onScroll, style, animate = animated, qa} = props;
    const [playAnimation, setPlayAnimation] = React.useState<boolean>(false);

    const divClassName = animate
        ? b(null, `${playAnimation && 'animate'} ${className}`)
        : className;
    return (
        <div className={divClassName} style={style} data-qa={qa}>
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
