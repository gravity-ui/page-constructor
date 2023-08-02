//TODO move to cloud components
import React from 'react';

import {ClassNameProps, QAProps} from '../../models';
import {block} from '../../utils';

import './Anchor.scss';

const b = block('Anchor');

export const qaIdByDefault = 'qa-anchor';

export interface AnchorProps extends ClassNameProps, QAProps {
    id: string;
}

const Anchor = ({id, className, qa}: AnchorProps) => (
    <div id={id} className={b(null, className)} data-qa={qa || qaIdByDefault}></div>
);

export default Anchor;
