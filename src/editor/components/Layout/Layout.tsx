import React, {Children, Fragment, PropsWithChildren, ReactElement} from 'react';

import {block} from '../../../utils';
import {ViewModeItem} from '../../types';
import ControlPanel from '../ControlPanel/ControlPanel';

import './Layout.scss';

const b = block('editor-layout');

const Form: React.FC<PropsWithChildren> = () => null;
const Preview: React.FC<PropsWithChildren> = () => null;

export interface LayoutProps {
    mode: ViewModeItem;
    onModeChange: (mode: ViewModeItem) => void;
}

const Layout = ({children, mode, onModeChange}: PropsWithChildren<LayoutProps>) => {
    const isEditingMode = mode === ViewModeItem.Edititng;
    let form, preview;

    function handleChild(child: ReactElement) {
        switch (child.type) {
            case Form:
                form = child.props.children;
                break;
            case Preview:
                preview = child.props.children;
                break;
        }
    }

    if (React.Children.toArray(children).length) {
        Children.forEach(children as ReactElement, handleChild);
    }

    return (
        <div className={b({'view-mode': !isEditingMode})}>
            <ControlPanel viewMode={mode} onViewModeChange={onModeChange} className={b('panel')} />
            <div className={b('container')}>
                {isEditingMode ? (
                    <Fragment>
                        <div className={b('form')}>{form}</div>
                        <div className={b('preview')}>{preview}</div>
                    </Fragment>
                ) : (
                    preview
                )}
            </div>
        </div>
    );
};

Layout.Form = Form;
Layout.Preview = Preview;

export default Layout;
