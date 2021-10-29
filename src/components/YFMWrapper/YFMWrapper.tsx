import React from 'react';
import {block} from '../../utils';
import toSnakeCase from 'snakecase-keys';
import {HTML} from '@doc-tools/components';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {Modifiers} from '../../models';

const yfm = block('yfm');

export interface YFMWrapperProps {
    className?: string;
    content: string;
    modifiers?: Modifiers;
}

const YFMWrapper: React.FunctionComponent<YFMWrapperProps & ClassNameProps> = ({
    content,
    modifiers,
    className,
}) => <HTML className={yfm(modifiers ? toSnakeCase(modifiers) : {}, className)}>{content}</HTML>;

export default YFMWrapper;
