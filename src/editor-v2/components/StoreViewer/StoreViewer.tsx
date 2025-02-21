import React, {useState} from 'react';

import {Code} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import ReactJson from 'react-json-view';

import {removeFn} from '../../../common/utils';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';

import './StoreViewer.scss';

const b = block('store-viewer');

interface StoreViewerProps extends ClassNameProps {
    store: object;
}

const StoreViewer: React.FC<StoreViewerProps> = ({store, className}) => {
    const [open, setOpen] = useState(false);
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
