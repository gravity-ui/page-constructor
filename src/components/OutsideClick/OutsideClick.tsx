//TODO move into cloud components?
import React, {PropsWithChildren, createRef} from 'react';

import noop from 'lodash/noop';

export interface OutsideClickProps {
    onOutsideClick: () => void;
    className?: string;
    onClick?: () => void;
}

export default class OutsideClick extends React.Component<PropsWithChildren<OutsideClickProps>> {
    ref = createRef<HTMLDivElement>();

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, {passive: true});
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    render() {
        const {children, className, onClick} = this.props;

        return (
            <div
                className={className}
                ref={this.ref}
                onClick={onClick}
                onKeyDown={noop}
                role={onClick ? 'button' : 'group'}
                tabIndex={onClick ? 0 : -1}
            >
                {children}
            </div>
        );
    }

    handleOutsideClick = (e: MouseEvent) => {
        if (
            e.target &&
            this.ref &&
            this.ref.current &&
            !this.ref.current.contains(e.target as Node)
        ) {
            this.props.onOutsideClick();
        }
    };
}
