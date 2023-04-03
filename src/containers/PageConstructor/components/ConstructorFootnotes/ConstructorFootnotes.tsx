import React from 'react';

import {YFMWrapper} from '../../../../components';
import {block} from '../../../../utils';

import './ConstructorFootnotes.scss';

const b = block('constructor-footnotes');

/**
 * @deprecated because useless
 *
 * @return - JSX
 */
export const ConstructorFootnotes = ({items}: {items: string[]}) => (
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
