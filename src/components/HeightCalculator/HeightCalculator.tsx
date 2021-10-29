import React, {Children} from 'react';
import {block} from '../../utils';
import _ from 'lodash';

import './HeightCalculator.scss';

const b = block('height-calculator');

export interface HeightCalculatorProps {
    onCalculate: (height: number) => void;
}

interface HeightCalculatorState {
    isCalculating: boolean;
}

export default class HeightCalculator extends React.Component<
    HeightCalculatorProps,
    HeightCalculatorState
> {
    state = {
        isCalculating: true,
    };

    container = React.createRef<HTMLDivElement>();
    itemRefs = Children.map(this.props.children, () => React.createRef<HTMLDivElement>()) ?? [];

    componentDidMount() {
        this.calculateContainerHeight();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const {isCalculating} = this.state;
        const {children} = this.props;
        return (
            isCalculating && (
                <div className={b()} ref={this.container}>
                    {Children.map(children, (child, index) => (
                        <div className={b('item-wrapper')} ref={this.itemRefs[index]} key={index}>
                            {child}
                        </div>
                    ))}
                </div>
            )
        );
    }

    private calculateContainerHeight = () => {
        if (this.container && this.container.current && this.itemRefs.length) {
            const maxHeight = Math.max(
                ...this.itemRefs.map((tabRef) => {
                    if (tabRef && tabRef.current) {
                        return tabRef.current.offsetHeight;
                    }
                    return 0;
                }),
            );

            this.props.onCalculate(maxHeight);
            this.setState({isCalculating: false});
        }
    };

    // eslint-disable-next-line react/sort-comp, @typescript-eslint/member-ordering
    private handleResize = _.debounce(() => {
        this.setState({isCalculating: true}, this.calculateContainerHeight);
    }, 100);
}
