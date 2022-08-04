import React, {Component, createRef, CSSProperties} from 'react';
import _ from 'lodash';
import {ClassNameProps} from '../../models';

import {block} from '../../utils';
import {BREAKPOINTS} from '../../constants';

import './FullWidthBackground.scss';

const b = block('FullWidthBackground');

export interface FullWidthBackgroundProps extends ClassNameProps {
    style?: CSSProperties;
    theme?: 'default' | 'rounded';
}

function getPadding(width: number) {
    return width > BREAKPOINTS.sm ? 16 : 8;
}

export default class FullWidthBackground extends Component<FullWidthBackgroundProps> {
    private ref = createRef<HTMLDivElement>();

    private setBg = _.debounce(() => {
        if (this.ref && this.ref.current) {
            const bg = this.ref.current;
            const width = document.documentElement.clientWidth || document.body.clientWidth;
            const padding = this.props.theme === 'rounded' ? getPadding(width) : 0;
            const {left} = bg.parentElement?.getBoundingClientRect() ?? {left: 0};

            bg.style.width = `${width - padding * 2}px`;
            bg.style.left = `-${left - padding}px`;
        }
    }, 100);

    componentDidMount() {
        if (this?.ref?.current?.parentElement) {
            this.ref.current.parentElement.style.position = 'relative';
            this.setBg();
            window.addEventListener('resize', this.setBg);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setBg);
    }

    render() {
        const {children, className, style, theme = 'default'} = this.props;
        return (
            <div className={b({[theme]: true}, className)} ref={this.ref} style={style}>
                {children}
            </div>
        );
    }
}
