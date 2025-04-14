import {Meta, StoryFn} from '@storybook/react';

import {Col, Grid, Row} from '../../../grid';
import Button, {ButtonProps} from '../Button';

import data from './data.json';

import './Button.stories.scss';

export default {
    component: Button,
    title: 'Components/Links and buttons/Button',
} as Meta;

const DefaultTemplate: StoryFn<ButtonProps> = (args) => <Button {...args} />;
const SizesTemplate: StoryFn<ButtonProps> = (args) => (
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
const ThemesSizesTemplate: StoryFn<ButtonProps> = (args) => (
    <Grid>
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
        <section style={{color: '#fff', background: '#3a74ff'}}>
            <SizesTemplate {...args} theme="outlined-contrast" />
            <SizesTemplate {...args} theme="flat-contrast" />
        </section>
    </Grid>
);

const WidthTemplate: StoryFn<ButtonProps> = (args) => (
    <Row>
        <Col>
            <Button {...args} width="auto" />
        </Col>
        <Col>
            <Button {...args} width="max" />
        </Col>
    </Row>
);

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind({});
export const Width = WidthTemplate.bind({});

Default.args = data.default.content as ButtonProps;
ThemesSizes.args = data.themesSizes.content as ButtonProps;
Width.args = data.themesSizes.content as ButtonProps;
