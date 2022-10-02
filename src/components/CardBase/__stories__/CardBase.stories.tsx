import {Meta, Story} from '@storybook/react/types-6-0';
import React, {Fragment, ReactElement} from 'react';

import CardBase, {CardBaseProps} from '../CardBase';
import {CARDS, COMPONENTS} from '../../../demo/constants';
import {Col, Row} from '../../../grid';

import data from './data.json';

export default {
    component: CardBase,
    title: `${COMPONENTS}/${CARDS}/CardBase`,
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

const BordersTemplate: Story<TemplateProps> = ({content, header, footer, ...args}) => (
    <Fragment>
        <Row>
            <Col>shadow</Col>
            <Col>line</Col>
            <Col>none</Col>
        </Row>
        <Row>
            <Col>
                <CardBase {...args} border="shadow">
                    <CardBase.Header>{header}</CardBase.Header>
                    <CardBase.Content>{content}</CardBase.Content>
                    <CardBase.Footer>{footer}</CardBase.Footer>
                </CardBase>
            </Col>
            <Col>
                <CardBase {...args} border="line">
                    <CardBase.Header>{header}</CardBase.Header>
                    <CardBase.Content>{content}</CardBase.Content>
                    <CardBase.Footer>{footer}</CardBase.Footer>
                </CardBase>
            </Col>
            <Col>
                <CardBase {...args} border="none">
                    <CardBase.Header>{header}</CardBase.Header>
                    <CardBase.Content>{content}</CardBase.Content>
                    <CardBase.Footer>{footer}</CardBase.Footer>
                </CardBase>
            </Col>
        </Row>
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const Borders = BordersTemplate.bind({});

type CardStoryProps = Omit<CardBaseProps, 'children'>;

Default.args = data.default.content as CardStoryProps;
Borders.args = data.borders.content as CardStoryProps;
