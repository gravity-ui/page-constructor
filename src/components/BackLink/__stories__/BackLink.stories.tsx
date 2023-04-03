import React, {Fragment} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';
import {Col, Row} from '../../../grid';
import BackLink, {BackLinkProps} from '../BackLink';

import data from './data.json';

export default {
    component: BackLink,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/BackLink`,
} as Meta;

const DefaultTemplate: Story<BackLinkProps> = (args) => <BackLink {...args} />;
const SizesTemplate: Story<BackLinkProps> = (args) => (
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
const ThemesSizesTemplate: Story<BackLinkProps> = (args) => (
    <Fragment>
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
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind({});

Default.args = data.default.content as BackLinkProps;
ThemesSizes.args = data.themesSizes.content as BackLinkProps;
