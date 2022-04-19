import {Meta, Story} from '@storybook/react/types-6-0';
import React, {ReactElement} from 'react';

import CardBase, {CardBaseProps} from '../CardBase';
import {CARDS, COMPONENTS} from '../../../demo/constants';

export default {
    component: CardBase,
    title: `${COMPONENTS}/${CARDS}/CardBase`,
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

interface TemplateProps extends CardBaseProps {
    content: ReactElement | ReactElement[];
    header: ReactElement | ReactElement[];
    footer: ReactElement | ReactElement[];
}

const DefaultTemplate: Story<TemplateProps> = ({content, header, footer, ...args}) => (
    <div style={{maxWidth: '1000px'}}>
        <CardBase {...args}>
            <CardBase.Header>{header}</CardBase.Header>
            <CardBase.Content>{content}</CardBase.Content>
            <CardBase.Footer>{footer}</CardBase.Footer>
        </CardBase>
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    url: '#',
    backgroundColor: '#b3e89b',
    content: <div>Здесь должен быть content</div>,
    header: <div>Здесь должен быть header</div>,
    footer: <div>Здесь должен быть footer</div>,
    border: 'shadow',
    className: '',
    bodyClassName: '',
    contentClassName: '',
};
