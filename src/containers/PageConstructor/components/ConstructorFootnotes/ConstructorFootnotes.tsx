import React from 'react';

import {YFMWrapper} from '../../../../components';
import {block} from '../../../../utils';

import './ConstructorFootnotes.scss';

const b = block('constructor-footnotes');

export const ConstructorFootnotes: React.FC<{items: string[]}> = ({items}) => (
    <ol className={b()}>
        {items.map((footnote, index) => (
            <li className={b('item')} key={index}>
                <YFMWrapper
                    content={footnote}
                    modifiers={{
                        constructor: true,
                        constructorFootnotePage: true,
                    }}
                />
            </li>
        ))}
    </ol>
);
