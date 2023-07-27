import React, {Fragment} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Col, GridAlignItems, Row} from '../../../grid';
import Control, {ControlProps} from '../Control';

import data from './data.json';

export default {
    component: Control,
    title: 'Components/Links and buttons/Control',
} as Meta;

const DefaultTemplate: StoryFn<ControlProps> = (args) => <Control {...args} />;
const SizesTemplate: StoryFn<ControlProps> = (args) => (
    <Fragment>
        <Col>
            <Control {...args} size="xs" />
        </Col>
        <Col>
            <Control {...args} size="s" />
        </Col>
        <Col>
            <Control {...args} size="m" />
        </Col>
        <Col>
            <Control {...args} size="l" />
        </Col>
    </Fragment>
);
const ThemesTemplate: StoryFn<ControlProps> = (args) => (
    <Fragment>
        <Row>
            <Col />
            <Col>xs</Col>
            <Col>s</Col>
            <Col>m</Col>
            <Col>l</Col>
        </Row>
        <Row alignItems={GridAlignItems.Center}>
            <Col>primary</Col>
            <SizesTemplate {...args} theme="primary" />
        </Row>
        <Row alignItems={GridAlignItems.Center}>
            <Col>secondary</Col>
            <SizesTemplate {...args} theme="secondary" />
        </Row>
        <Row alignItems={GridAlignItems.Center}>
            <Col>link</Col>
            <SizesTemplate {...args} theme="link" />
        </Row>
        <Row alignItems={GridAlignItems.Center}>
            <Col>accent</Col>
            <SizesTemplate {...args} theme="accent" />
        </Row>
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const SizesThemes = ThemesTemplate.bind({});

Default.args = data.default.content as ControlProps;
SizesThemes.args = data.sizesThemes.content as ControlProps;
