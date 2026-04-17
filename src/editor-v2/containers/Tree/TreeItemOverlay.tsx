import {Card} from '@gravity-ui/uikit';

import type {ConstructorBlock} from '../../../models';
import {getItemTitle} from '../../utils';
import {editorCn} from '../../utils/cn';
import {HTML} from '../../../components';

import {getBlockTypeLabel} from './utils/blocksBridge';

import './TreeItem.scss';

const b = editorCn('tree-item');

export interface TreeItemOverlayProps {
    block: ConstructorBlock;
    count: number;
    indentLeft: number;
}

export function TreeItemOverlay({block, count, indentLeft}: TreeItemOverlayProps) {
    const typeLabel = getBlockTypeLabel(block);
    const treeTitle = getItemTitle(block);

    return (
        <Card className={b({overlay: true})} style={{marginLeft: indentLeft}} data-overlay>
            <div className={b('main')}>
                <div className={b('text')}>
                    <div className={b('type')}>{typeLabel}</div>
                    <HTML className={b('title')}>{treeTitle}</HTML>
                </div>
            </div>
            {count > 0 ? <span className={b('badge')}>{count}</span> : null}
        </Card>
    );
}
