import React from 'react';
import {block} from '../../../utils/cn';

import '@yandex-data-ui/common/styles/yfm.scss';
import './Demo.scss';

export interface DemoProps {
    title: string;
}

export interface DemoRowProps {
    title: string;
}

export interface DemoCellProps {
    title: string;
}

const b = block('demo');

export class Demo extends React.Component<DemoProps> {
    static Row: React.FC<DemoRowProps> = function ({title, children}) {
        return (
            <div className={b('row')}>
                <div className={b('row-title')}>{title}</div>
                <div className={b('row-content')}>{children}</div>
            </div>
        );
    };

    static Cell: React.FC<DemoCellProps> = function ({title, children}) {
        return (
            <div className={b('cell')}>
                <div className={b('cell-content')}>{children}</div>
                <div className={b('cell-title')}>{title}</div>
            </div>
        );
    };

    render() {
        const {title, children} = this.props;

        return (
            <div className={b()}>
                <h1 className={b('title')}>{title}</h1>
                <div className={b('content')}>{children}</div>
            </div>
        );
    }
}
