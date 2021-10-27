import React, {CSSProperties, useState} from 'react';
import block from 'bem-cn-lite';
import {Waypoint} from 'react-waypoint';
import withAnimateContext from '../../hoc/withAnimateContext';
import {AnimateContextProps} from '../../context/animateContext/AnimateContext';

const b = block('AnimateBlock');

interface AnimateBlockProps extends AnimateContextProps {
    animate?: boolean;
    offset?: number;
    className?: string;
    style?: CSSProperties;
    onScroll?: () => void;
}

const AnimateBlock: React.FC<AnimateBlockProps> = (props) => {
    const {
        children,
        className,
        offset = 100,
        onScroll,
        style,
        animated,
        animate = animated,
    } = props;

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

export default withAnimateContext(AnimateBlock);
