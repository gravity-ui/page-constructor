import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Col, Row} from '../../../grid';
import BackLink, {BackLinkProps} from '../BackLink';

import data from './data.json';

export default {
    component: BackLink,
    title: 'Components/Links and buttons/BackLink',
} as Meta;

const DefaultTemplate: StoryFn<BackLinkProps> = (args) => <BackLink {...args} />;
const SizesTemplate: StoryFn<BackLinkProps> = (args) => (
    <Row>
        <Col>{args.theme}</Col>
        <Col>
            <BackLink {...args} size="s" title="Size s" />
        </Col>
        <Col>
            <BackLink {...args} size="m" title="Size m" />
        </Col>
        <Col>
            <BackLink {...args} size="l" title="Size l" />
        </Col>
        <Col>
            <BackLink {...args} size="xl" title="Size xl" />
        </Col>
    </Row>
);
const ThemesSizesTemplate: StoryFn<BackLinkProps> = (args) => (
    <React.Fragment>
        <Row>
            <Col />
            <Col>s</Col>
            <Col>m</Col>
            <Col>l</Col>
            <Col>xl</Col>
        </Row>
        <SizesTemplate {...args} theme="default" />
        <section style={{color: '#3a74ff'}}>
            <SizesTemplate {...args} theme="special" />
        </section>
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind({});

Default.args = data.default.content as BackLinkProps;
ThemesSizes.args = data.themesSizes.content as BackLinkProps;
