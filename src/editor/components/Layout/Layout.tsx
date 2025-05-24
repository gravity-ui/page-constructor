import * as React from 'react';

import {block} from '../../../utils';
import {EditModeItem, ViewModeItem} from '../../types';
import DeviceEmulation from '../DeviceEmulation/DeviceEmulation';

import './Layout.scss';

const b = block('editor-layout');

const Left: (props: React.PropsWithChildren) => React.ReactNode = () => null;
const Right: (props: React.PropsWithChildren) => React.ReactNode = () => null;

export interface LayoutProps {
    editMode: EditModeItem;
    viewMode: ViewModeItem;
}

// TODO in https://github.com/gravity-ui/page-constructor/issues/884 this component will be disappeared

const Layout = ({children, editMode, viewMode}: React.PropsWithChildren<LayoutProps>) => {
    let left, right;
    const isEditingMode = editMode === EditModeItem.Form;

    function handleChild(child: React.ReactElement) {
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
        React.Children.forEach(children as React.ReactElement, handleChild);
    }

    return (
        <div className={b('container')}>
            <React.Fragment>
                {left && <div className={b('left')}>{left}</div>}
                {right && (
                    <div className={b('right', {editing: isEditingMode})}>
                        <DeviceEmulation mode={viewMode}>{right}</DeviceEmulation>
                    </div>
                )}
            </React.Fragment>
        </div>
    );
};

Layout.Left = Left;
Layout.Right = Right;

export default Layout;
