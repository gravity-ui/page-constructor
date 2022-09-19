import React, {createRef, PropsWithChildren} from 'react';
import _ from 'lodash';

import {block} from '../../utils';
import {ToggleArrow} from '..';

import './OverflowScroller.scss';

const b = block('overflow-scroller');
const TRANSITION_TIME = 300;

type Arrow = 'left' | 'right';

export interface OverflowScrollerProps {
    className?: string;
    onScrollStart?: () => void;
    onScrollEnd?: () => void;
}

export interface OverflowScrollerState {
    arrows: Arrow[];
    scrollValue: number;
}

export default class OverflowScroller extends React.Component<
    PropsWithChildren<OverflowScrollerProps>,
    OverflowScrollerState
> {
    state = {
        arrows: [],
        scrollValue: 0,
    };
    containerRef = createRef<HTMLDivElement>();
    wrapperRef = createRef<HTMLDivElement>();

    componentDidMount() {
        this.checkOverflow();
        window.addEventListener('resize', this.checkOverflow);
    }

    componentDidUpdate(
        _prepvProps: OverflowScrollerProps,
        {scrollValue: prevScrollValue}: OverflowScrollerState,
    ) {
        const {onScrollEnd} = this.props;

        if (prevScrollValue !== this.state.scrollValue && onScrollEnd) {
            setTimeout(onScrollEnd, TRANSITION_TIME + 100);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkOverflow);
    }

    render() {
        const {className, children} = this.props;
        const {arrows, scrollValue} = this.state;
        const wrapperStyle = arrows.length ? {left: -scrollValue} : {left: 0};

        return (
            <div className={b(null, className)} ref={this.containerRef}>
                <div className={b('wrapper')} style={wrapperStyle} ref={this.wrapperRef}>
                    {children}
                </div>
                {arrows.map((direction: Arrow) => (
                    <div
                        key={direction}
                        className={b('scroller', {type: direction})}
                        onClick={(e: React.MouseEvent) => this.handleScrollClick(e, direction)}
                    >
                        <ToggleArrow size={18} type={'horizontal'} iconType="navigation" />
                    </div>
                ))}
            </div>
        );
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
    private checkOverflow = _.debounce(() => {
        if (
            this.containerRef &&
            this.containerRef.current &&
            this.wrapperRef &&
            this.wrapperRef.current
        ) {
            const containerWidth = this.containerRef.current.offsetWidth;
            const wrapperWidth = this.wrapperRef.current.offsetWidth;
            const scrollValue = 0;
            const arrows: Arrow[] = wrapperWidth < containerWidth ? [] : ['right'];

            this.setState({scrollValue, arrows});
        }
    }, 100);

    private handleScrollClick = (e: React.MouseEvent, arrow: Arrow) => {
        const {scrollValue} = this.state;
        const {onScrollStart} = this.props;

        if (
            this.containerRef &&
            this.containerRef.current &&
            this.wrapperRef &&
            this.wrapperRef.current
        ) {
            const containerWidth = this.containerRef.current.offsetWidth;
            const wrapperWidth = this.wrapperRef.current.offsetWidth;
            const hiddenWidth =
                arrow === 'right' ? wrapperWidth - (containerWidth + scrollValue) : scrollValue;
            const delta = containerWidth > hiddenWidth ? hiddenWidth : containerWidth;
            const newScrollValue = arrow === 'right' ? scrollValue + delta : scrollValue - delta;
            let newArrows: Arrow[] = ['left', 'right'];

            if (newScrollValue + containerWidth >= wrapperWidth) {
                newArrows = ['left'];
            } else if (!newScrollValue) {
                newArrows = ['right'];
            }

            this.setState({arrows: newArrows, scrollValue: newScrollValue});

            if (onScrollStart) {
                onScrollStart();
            }

            e.stopPropagation();
        }
    };
}
