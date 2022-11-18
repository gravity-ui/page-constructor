import _ from 'lodash';
import block from 'bem-cn-lite';
import React, {Fragment, createRef, RefObject} from 'react';
import {Portal} from '@gravity-ui/uikit';

import {OutsideClick} from '../../../index';
import {NavigationLinkItem} from '../../../../models/navigation';
import NavigationItem from '../NavigationItem/NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');

export interface NavigationPopupProps {
    items: NavigationLinkItem[];
    onClose: () => void;
    left?: number;
    className?: string;
}

interface NavigationPopupState {
    calculatedLeft?: number;
}

export default class NavigationPopup extends React.Component<
    NavigationPopupProps,
    NavigationPopupState
> {
    ref: RefObject<HTMLDivElement> = createRef();
    state = {
        calculatedLeft: this.props.left,
    };

    private calculateLeft = _.debounce(() => {
        const {left} = this.props;

        if (this.ref && this.ref.current && left) {
            const right = left + this.ref.current.offsetWidth;
            const docWidth = document.body.clientWidth;
            const calculatedLeft = right > docWidth ? left - (right - docWidth) : left;
            this.setState({calculatedLeft});
        } else {
            this.setState({calculatedLeft: left});
        }
    }, 100);

    componentDidMount() {
        this.calculateLeft();
        window.addEventListener('resize', this.calculateLeft);
    }

    componentDidUpdate(prevProps: NavigationPopupProps) {
        if (prevProps.left !== this.props.left) {
            this.calculateLeft();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateLeft);
    }

    render() {
        if (!document || !document.body) {
            return null;
        }

        const {onClose} = this.props;
        const {calculatedLeft} = this.state;

        return (
            <Portal>
                <div ref={this.ref} className={b()} style={{left: calculatedLeft}}>
                    <OutsideClick onOutsideClick={onClose}>
                        {this.renderDefaultPopup()}
                    </OutsideClick>
                </div>
            </Portal>
        );
    }

    private renderDefaultPopup() {
        return (
            <Fragment>
                {this.props.items.map((item) => (
                    <NavigationItem key={item.text} className={b('link')} data={item} />
                ))}
            </Fragment>
        );
    }
}
