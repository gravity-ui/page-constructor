import React from 'react';

import {block} from '../../utils';
import {ContainerProps as ContainerParams} from '../../models/constructor-items/deprecated';
import {GridBlock} from '../../components';

import './Container.scss';

const b = block('container-block');

export interface ContainerProps extends Omit<ContainerParams, 'children'> {}

const Container: React.FunctionComponent<ContainerProps> = ({children, justify, sticky}) =>
    children ? (
        <div className={b({sticky})}>
            <GridBlock justify={justify}>{children}</GridBlock>
        </div>
    ) : null;

export default Container;
