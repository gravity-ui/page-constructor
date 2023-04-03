import React, {Fragment} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';
import {Col, Row} from '../../../grid';
import Button, {ButtonProps} from '../Button';

import data from './data.json';

export default {
    component: Button,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/Button`,
} as Meta;

const DefaultTemplate: Story<ButtonProps> = (args) => <Button {...args} />;
const SizesTemplate: Story<ButtonProps> = (args) => (
    <Row>
        <Col style={{margin: '20px 0'}}>{args.theme}</Col>
        <Col>
            <Button {...args} size="s" />
        </Col>
        <Col>
            <Button {...args} size="m" />
        </Col>
        <Col>
            <Button {...args} size="l" />
        </Col>
        <Col>
            <Button {...args} size="xl" />
        </Col>
    </Row>
);
const ThemesSizesTemplate: Story<ButtonProps> = (args) => (
    <Fragment>
        <Row>
            <Col />
            <Col>s</Col>
            <Col>m</Col>
            <Col>l</Col>
            <Col>xl</Col>
        </Row>
        <SizesTemplate {...args} theme="github" />
        <SizesTemplate {...args} theme="app-store" />
        <SizesTemplate {...args} theme="google-play" />
        <SizesTemplate {...args} theme="scale" />
        <SizesTemplate {...args} theme="monochrome" />
        <SizesTemplate {...args} theme="normal" />
        <SizesTemplate {...args} theme="action" />
        <SizesTemplate {...args} theme="outlined" />
        <SizesTemplate {...args} theme="outlined-info" />
        <SizesTemplate {...args} theme="outlined-danger" />
        <SizesTemplate {...args} theme="raised" />
        <SizesTemplate {...args} theme="flat" />
        <SizesTemplate {...args} theme="flat-info" />
        <SizesTemplate {...args} theme="flat-danger" />
        <SizesTemplate {...args} theme="flat-secondary" />
        <SizesTemplate {...args} theme="normal-contrast" />
        <section style={{color: '#3a74ff'}}>
            <SizesTemplate {...args} theme="outlined-contrast" />
            <SizesTemplate {...args} theme="flat-contrast" />
        </section>
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind({});

Default.args = data.default.content as ButtonProps;
ThemesSizes.args = data.themesSizes.content as ButtonProps;
