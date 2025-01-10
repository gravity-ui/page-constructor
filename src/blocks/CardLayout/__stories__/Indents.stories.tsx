import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {CardLayoutBlockModel, CardLayoutBlockProps, SubBlockModels} from '../../../models';
import {block} from '../../../utils';
import CardLayoutComponent from '../CardLayout';

import data from './data.json';

import './Indents.stories.scss';

export default {
    title: 'Block Indents/Example',
    component: CardLayoutComponent,
} as Meta;

const b = block('indents-wrapper');

const createCardArray: (
    count: number,
    shared: Omit<SubBlockModels, 'type'> & {type: string},
) => SubBlockModels[] = (count, shared) =>
    Array.from({length: count}, () => ({...shared} as SubBlockModels));

const Template: StoryFn<CardLayoutBlockModel> = ({title, ...restArgs}) => (
    <div className={b()}>
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...restArgs,
                        title: `${title} with zero indents at the top and bottom`,
                        indent: {
                            top: '0',
                            bottom: '0',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with XS indents at the top and bottom`,
                        indent: {
                            top: 'xs',
                            bottom: 'xs',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with S indents at the top and bottom`,
                        indent: {
                            top: 's',
                            bottom: 's',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with M indents at the top and bottom`,
                        indent: {
                            top: 'm',
                            bottom: 'm',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with L (default) indents at the top and bottom`,
                        indent: {
                            top: 'l',
                            bottom: 'l',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with XL indents at the top and bottom`,
                        indent: {
                            top: 'xl',
                            bottom: 'xl',
                        },
                    },
                ],
            }}
        />
    </div>
);

export const CardLayout = Template.bind({});

CardLayout.args = {
    ...data.default.content,
    children: createCardArray(3, data.cards.layoutItem),
} as CardLayoutBlockProps;
