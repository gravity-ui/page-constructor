import * as React from 'react';

import debounce from 'lodash/debounce';

import {BREAKPOINTS} from '../../constants';
import {ClassNameProps} from '../../models';
import {block} from '../../utils';

import './FullWidthBackground.scss';

const b = block('FullWidthBackground');

export interface FullWidthBackgroundProps extends ClassNameProps {
    style?: React.CSSProperties;
    theme?: 'default' | 'rounded';
}

function getPadding(width: number) {
    return width > BREAKPOINTS.sm ? 16 : 8;
}

export default class FullWidthBackground extends React.Component<
    React.PropsWithChildren<FullWidthBackgroundProps>
> {
    private ref = React.createRef<HTMLDivElement>();

    private setBg = debounce(() => {
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
            window.addEventListener('resize', this.setBg, {passive: true});
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
