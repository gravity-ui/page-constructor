//TODO move to cloud components
import React from 'react';

import {ClassNameProps} from '../../models';
import {block} from '../../utils';

import './Anchor.scss';

const b = block('Anchor');

export const qaIdByDefault = 'qa-anchor';

export interface AnchorProps extends ClassNameProps {
    id: string;
    dataQa?: string;
}

const Anchor = ({id, className, dataQa}: AnchorProps) => (
    <div id={id} className={b(null, className)} data-qa={dataQa || qaIdByDefault}></div>
);

export default Anchor;
