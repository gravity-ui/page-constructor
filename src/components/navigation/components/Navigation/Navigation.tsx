import _ from 'lodash';
import block from 'bem-cn-lite';
import React, {RefObject, createRef, Fragment, MouseEventHandler} from 'react';
import OverflowScroller from '../../../OverflowScroller/OverflowScroller';
// import {LocationContext} from '../../context/locationContext';

import {
    NavigationDropdownItem,
    NavigationItem as NavigationItemModel,
    NavigationItemType,
} from '../../../../models/navigation';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import NavigationItem from '../NavigationItem/NavigationItem';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationOwnProps {
    links: NavigationItemModel[];
    activeItemIndex: number;
    onActiveItemChange: (index: number) => void;
    className?: string;
    highlightActiveItem?: boolean;
}

// interface WithRouterProps {
//     router: NextRouter;
// }

// export type NavigationProps = NavigationOwnProps & WithRouterProps;
export type NavigationProps = NavigationOwnProps;

interface NavigationState {
    itemPositions: number[];
}

class Navigation extends React.Component<NavigationProps, NavigationState> {
    itemRefs: RefObject<HTMLLIElement>[] = [];
    state = {
        itemPositions: [],
    };
    lastLeftScroll = 0;

    componentDidMount() {
        this.calculateItemPositions();
        this.lastLeftScroll = window.pageXOffset;

        window.addEventListener('resize', this.calculateItemPositions);
        window.addEventListener('scroll', this.calculateOnScroll);
    }

    // componentDidUpdate(prevProps: NavigationProps) {
    //     //use locationContext
    //     const {router} = this.props;
    //
    //     if (router.asPath !== prevProps.router.asPath) {
    //         this.hidePopup();
    //     }
    // }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateItemPositions);
        window.removeEventListener('scroll', this.calculateOnScroll);
    }

    render() {
        const {className} = this.props;

        return (
            <OverflowScroller
                className={b(null, className)}
                onScrollStart={this.hidePopup}
                onScrollEnd={this.calculateItemPositions}
            >
                {this.renderContent()}
            </OverflowScroller>
        );
    }

    renderContent() {
        const {links, activeItemIndex, highlightActiveItem} = this.props;
        const {itemPositions} = this.state;

        return (
            <nav>
                <ul className={b('links')}>
                    {links.map((link, index) => {
                        const isActive = index === activeItemIndex;
                        const onClick = this.getItemClickHandler(index);

                        if (!this.itemRefs[index]) {
                            this.itemRefs[index] = createRef();
                        }

                        return (
                            <li ref={this.itemRefs[index]} key={index} className={b('links-item')}>
                                {link.type === NavigationItemType.Dropdown ? (
                                    this.renderNavDropdown(
                                        link,
                                        onClick,
                                        isActive,
                                        itemPositions[index],
                                    )
                                ) : (
                                    <NavigationItem data={link} onClick={onClick} />
                                )}
                                {highlightActiveItem && isActive && this.renderSlider()}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }

    private renderNavDropdown = (
        data: NavigationDropdownItem,
        onClick: MouseEventHandler,
        isActive: boolean,
        position: number,
    ) => {
        const {text, items, ...popupProps} = data;

        return (
            <Fragment>
                <NavigationItem
                    className={b('link')}
                    onClick={onClick}
                    isOpened={isActive}
                    data={{text, type: NavigationItemType.Dropdown}}
                />
                {isActive && (
                    <NavigationPopup
                        left={position}
                        onClose={this.hidePopup}
                        items={items}
                        {...popupProps}
                    />
                )}
            </Fragment>
        );
    };

    private renderSlider() {
        return (
            <div className={b('slider-container')}>
                <div className={b('slider')} />
            </div>
        );
    }

    private getItemClickHandler: (index: number) => MouseEventHandler = (index) => (e) => {
        e.stopPropagation();
        const {activeItemIndex, onActiveItemChange} = this.props;
        onActiveItemChange(index === activeItemIndex ? -1 : index);
    };

    private hidePopup = () => {
        this.props.onActiveItemChange(-1);
    };

    // eslint-disable-next-line @typescript-eslint/member-ordering
    private calculateItemPositions = _.debounce(() => {
        if (this.itemRefs.length) {
            const itemPositions = this.itemRefs.map(
                (itemRef) => (itemRef.current && itemRef.current.getBoundingClientRect().left) || 0,
            );
            this.setState({itemPositions});
        }
    }, 100);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    private calculateOnScroll = _.debounce(() => {
        const curLeftScroll = window.pageXOffset;

        if (curLeftScroll !== this.lastLeftScroll) {
            this.lastLeftScroll = curLeftScroll;
            this.calculateItemPositions();
        }
    }, 100);
}

// export default withRouter(Navigation);
export default Navigation;
