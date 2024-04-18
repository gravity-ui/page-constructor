import React, {Children, Fragment, PropsWithChildren, ReactElement, useState} from 'react';

import {ArrowToggle} from '@gravity-ui/uikit';

import {block} from '../../../utils';
import {EditModeItem, ViewModeItem} from '../../types';
import DeviceEmulation from '../DeviceEmulation/DeviceEmulation';

import './Layout.scss';

const b = block('editor-layout');

const Left: React.FC<PropsWithChildren> = () => null;
const Right: React.FC<PropsWithChildren> = () => null;

export interface LayoutProps {
    editMode: EditModeItem;
    viewMode: ViewModeItem;
}

// TODO in https://github.com/gravity-ui/page-constructor/issues/884 this component will be disappeared

const Layout = ({children, editMode, viewMode}: PropsWithChildren<LayoutProps>) => {
    const [isOpenLeft, setIsOpenLeft] = useState(true);

    let left, right;
    const isEditingMode = editMode === EditModeItem.Form;

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
        <div className={b('container')}>
            <Fragment>
                {left && (
                    <React.Fragment>
                        <div
                            onClick={() => setIsOpenLeft(!isOpenLeft)}
                            className={b('arrow-toggle')}
                        >
                            <ArrowToggle direction={isOpenLeft ? 'left' : 'right'} />
                        </div>
                        <div className={b('left', {closed: !isOpenLeft})}>{left}</div>
                    </React.Fragment>
                )}
                {right && (
                    <div className={b('right', {editing: isEditingMode})}>
                        <DeviceEmulation mode={viewMode}>{right}</DeviceEmulation>
                    </div>
                )}
            </Fragment>
        </div>
    );
};

Layout.Left = Left;
Layout.Right = Right;

export default Layout;
