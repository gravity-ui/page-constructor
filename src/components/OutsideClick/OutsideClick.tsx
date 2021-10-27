//TODO move into cloud components?

import React, {createRef} from 'react';

export interface OutsideClickProps {
    onOutsideClick: () => void;
    className?: string;
    onClick?: () => void;
}

export default class OutsideClick extends React.Component<OutsideClickProps> {
    ref = createRef<HTMLDivElement>();

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    render() {
        const {className, onClick, children} = this.props;
        return (
            <div className={className} ref={this.ref} onClick={onClick}>
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
