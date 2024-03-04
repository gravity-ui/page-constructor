import React, {ErrorInfo, PropsWithChildren} from 'react';

import {BlockDecorationProps} from '../../../models';
import {block} from '../../../utils';
import {getBlockId} from '../../utils';

import {i18n} from './i18n';

import './ErrorBoundary.scss';

const b = block('error-boundary');

interface ErrorBoundaryProps extends PropsWithChildren, Partial<BlockDecorationProps> {}
interface ErrorBoundaryState {
    error?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {} as ErrorBoundaryState;

    componentDidCatch(error: Error, info: ErrorInfo) {
        this.setState({error: `${error.message} ${info?.componentStack}`});
    }

    render() {
        const {type, index} = this.props;
        const {error} = this.state;
        const header = type
            ? i18n('error-block-header', {id: getBlockId({type, index})})
            : i18n('error-page-header');

        if (this.state.error) {
            return (
                <div className={b()}>
                    <div className={b('container')}>
                        <div className={b('image')} />
                        <div className={b('content')}>
                            <h2 className={b('header')}>{header}</h2>
                            <code className={b('error')}>{error}</code>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
