//TODO move to cloud components
import React from 'react';
import {ClassNameProps} from '../../models';

import {block} from '../../utils';
import './Anchor.scss';

const b = block('Anchor');

export interface AnchorProps extends ClassNameProps {
    id: string;
}

const Anchor = ({id, className}: AnchorProps) => <div id={id} className={b(null, className)}></div>;

export default Anchor;
