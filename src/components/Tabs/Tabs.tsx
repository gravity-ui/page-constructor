import React, {Children} from 'react';
import {Tabs as TabsCommon} from '@yandex-data-ui/common';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import block from 'bem-cn-lite';
import {TabsProps as TabsParams} from '../../models';
import HeightCalculator from '../HeightCalculator/HeightCalculator';

import './Tabs.scss';

export interface TabsProps extends Omit<TabsParams, 'children'> {}

interface TabsState {
    activeTab: string;
    contentHeight: number;
}

const b = block('tabs-block');
const ANIMATION_DELAY = 400;

export default class Tabs extends React.Component<TabsProps, TabsState> {
    state = {
        activeTab: this.props.titles && this.props.titles[0],
        contentHeight: 0,
    };

    container = React.createRef<HTMLDivElement>();

    render() {
        const {children, titles} = this.props;
        const {activeTab} = this.state;
        const tabItems = titles.map((title) => ({id: title, title}));
        const activeChild = Children.toArray(children)[titles.indexOf(activeTab)];

        return (
            <div className={b()}>
                <TabsCommon
                    items={tabItems}
                    activeTab={activeTab}
                    onSelectTab={this.handleTabChange}
                />
                <div ref={this.container} className={b('container')}>
                    <TransitionGroup>
                        {activeChild && (
                            <CSSTransition
                                key={activeTab}
                                timeout={ANIMATION_DELAY}
                                classNames={b('item')}
                            >
                                <div className={b('tab')} key={activeTab}>
                                    {activeChild}
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <HeightCalculator onCalculate={this.onHeightCalculation}>
                    {children}
                </HeightCalculator>
            </div>
        );
    }

    private onHeightCalculation = (height: number) => {
        if (this.container && this.container.current) {
            this.container.current.style.height = `${height}px`;
        }
    };

    private handleTabChange = (activeTab: string) => {
        this.setState({activeTab});
    };
}
