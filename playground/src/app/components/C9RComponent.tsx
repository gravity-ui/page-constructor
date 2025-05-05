'use client';

import block from 'bem-cn-lite';

import './C9RComponent.scss';

const b = block('c9r-component');

export const C9RComponent = () => {
    return (
        <div className={b()}>
            <div className={b('header')}>
                <div className={b('title')}>C9R</div>
            </div>
            <div className={b('info-bar')}>
                <div className={b('editor-info')}>Editor alpha 1.0.0</div>
            </div>
        </div>
    );
};

export default C9RComponent;
