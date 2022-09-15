import React from 'react';

import {YFMWrapper} from '../../../../components';
import {block} from '../../../../utils';
import {ReactFCC} from '../../../../models';

import './ConstructorFootnotes.scss';

const b = block('constructor-footnotes');

export const ConstructorFootnotes: ReactFCC<{items: string[]}> = ({items}) => (
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
