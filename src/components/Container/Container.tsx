import React from 'react';
import {block} from '../../utils';

import {ContainerProps as ContainerParams} from '../../models';
import {Grid} from '../../components';

import './Container.scss';

const b = block('container-block');

export interface ContainerProps extends Omit<ContainerParams, 'children'> {}

const Section: React.FunctionComponent<ContainerProps> = ({children, justify, sticky}) =>
    children ? (
        <div className={b({sticky})}>
            <Grid justify={justify}>{children}</Grid>
        </div>
    ) : null;

export default Section;
