import {Code} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import * as React from 'react';
import ReactJson from 'react-json-view';

import {removeFn} from '../../../../common/utils';
import {editorCn} from '../../utils/cn';

import './StoreViewer.scss';

const b = editorCn('store-viewer');

interface StoreViewerProps {
    className?: string;
    store: object;
}

const StoreViewer = ({store, className}: StoreViewerProps) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className={b({open}, className)}>
            <div className={b('head')}>
                <Button view="action" onClick={() => setOpen(!open)}>
                    <Icon data={Code} />
                </Button>
            </div>
            <div className={b('box')}>
                <ReactJson
                    style={{backgroundColor: 'transparent'}}
                    src={removeFn(store)}
                    collapsed
                    theme="bright:inverted"
                />
            </div>
        </div>
    );
};

export default StoreViewer;
