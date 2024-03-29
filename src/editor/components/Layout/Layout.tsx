import React, {Children, Fragment, PropsWithChildren, ReactElement} from 'react';

import {Theme} from '../../../models';
import {block} from '../../../utils';
import {ViewModeItem} from '../../types';
import ControlPanel from '../ControlPanel/ControlPanel';
import DeviceEmulation from '../DeviceEmulation/DeviceEmulation';

import './Layout.scss';

const b = block('editor-layout');

const Left: React.FC<PropsWithChildren> = () => null;
const Right: React.FC<PropsWithChildren> = () => null;

export interface LayoutProps {
    mode: ViewModeItem;
    onModeChange: (mode: ViewModeItem) => void;
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const Layout = ({
    children,
    mode,
    onModeChange,
    theme,
    onThemeChange,
}: PropsWithChildren<LayoutProps>) => {
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
            <ControlPanel
                viewMode={mode}
                onViewModeChange={onModeChange}
                className={b('panel')}
                theme={theme}
                onThemeChange={onThemeChange}
            />
            <div className={b('container')}>
                <Fragment>
                    {left && <div className={b('left')}>{left}</div>}
                    {right && (
                        <div className={b('right', {editing: isEditingMode})}>
                            <DeviceEmulation mode={mode}>{right}</DeviceEmulation>
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
