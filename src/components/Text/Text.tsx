import React from 'react';
import {block} from '../../utils';

import '@doc-tools/transform/dist/js/yfm';

import {TextProps as TextParams} from '../../models';
import YFMWrapper from '../YFMWrapper/YFMWrapper';
import i18n from './i18n';

import './Text.scss';

const b = block('text-block');

interface TextState {
    isOpened: boolean;
}

export default class Text extends React.Component<TextParams, TextState> {
    state = {
        isOpened: false,
    };

    render() {
        const {text, folded, justify, footnote} = this.props;
        const {isOpened} = this.state;

        return (
            <div className={b({justify, folded: folded && !isOpened})}>
                {this.renderText(text, Boolean(folded), footnote)}
                {this.renderFolded()}
            </div>
        );
    }

    private renderText(text: string, hasfold?: boolean, footnote?: boolean) {
        return (
            <span className={b('text', {hasfold})}>
                <YFMWrapper
                    content={text}
                    modifiers={{
                        constructor: true,
                        redefinitions: true,
                        constructorFootnoteText: footnote,
                    }}
                />
            </span>
        );
    }

    private renderFolded() {
        const {folded} = this.props;
        const {isOpened} = this.state;

        if (!folded) {
            return null;
        }

        return isOpened ? (
            this.renderText(folded)
        ) : (
            <button className={b('button')} onClick={this.toggle}>
                {i18n('constructor_read_all')}
            </button>
        );
    }

    private toggle = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    };
}
