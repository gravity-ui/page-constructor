import React from 'react';
import block from 'bem-cn-lite';
import {HTML} from '@doc-tools/components';

import {Modifiers, TilesProps} from '../../models';
import {Row, GridColumnSize} from '../../grid';

import './Tiles.scss';

const b = block('tiles-block');

const Tiles: React.FunctionComponent<TilesProps> = ({
    columns = {[GridColumnSize.All]: 1},
    items,
}) => (
    <Row className={b()}>
        <div className={b('item-wrapper', columns as Modifiers)}>
            {items.map(({text, icon, url}) => {
                return (
                    <a key={text} href={url} className={b('item', {with_icon: Boolean(icon)})}>
                        {icon && <img src={icon} className={b('icon')} />}
                        <HTML>{text}</HTML>
                    </a>
                );
            })}
        </div>
    </Row>
);
export default Tiles;
