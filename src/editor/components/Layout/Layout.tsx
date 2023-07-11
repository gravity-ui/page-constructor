import React, {Children, Fragment, PropsWithChildren, ReactElement} from 'react';

import {block} from '../../../utils';
import {ViewModeItem} from '../../types';
import ControlPanel from '../ControlPanel/ControlPanel';
import DevicePreview from '../DevicePreview/DevicePreview';

import './Layout.scss';

const b = block('editor-layout');

const Left: React.FC<PropsWithChildren> = () => null;
const Right: React.FC<PropsWithChildren> = () => null;

export interface LayoutProps {
    mode: ViewModeItem;
    onModeChange: (mode: ViewModeItem) => void;
}

const Layout = ({children, mode, onModeChange}: PropsWithChildren<LayoutProps>) => {
    let left, right;
    const isEditingMode = mode === ViewModeItem.Edititng;

    function handleChild(child: ReactElement) {
        switch (child?.type) {
            case Left:
                left = child?.props.children;
                break;
            case Right:
                right = child?.props.children;
                break;
        }
    }

    if (React.Children.toArray(children).length) {
        Children.forEach(children as ReactElement, handleChild);
    }

    return (
        <div className={b()}>
            <ControlPanel viewMode={mode} onViewModeChange={onModeChange} className={b('panel')} />
            <div className={b('container')}>
                <Fragment>
                    {left && <div className={b('left')}>{left}</div>}
                    {right && (
                        <div className={b('right', {editing: isEditingMode})}>
                            <DevicePreview mode={mode}>{right}</DevicePreview>
                        </div>
                    )}
                </Fragment>
            </div>
        </div>
    );
};

Layout.Left = Left;
Layout.Right = Right;

export default Layout;
