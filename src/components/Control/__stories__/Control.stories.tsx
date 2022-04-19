import {Meta, Story} from '@storybook/react/types-6-0';
import React, {Fragment} from 'react';

import Control, {ControlProps} from '../Control';
import {Col, GridAlignItems, Row} from '../../../grid';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';

export default {
    component: Control,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/Control`,
} as Meta;

const DefaultTemplate: Story<ControlProps> = (args) => <Control {...args} />;
const SizesTemplate: Story<ControlProps> = (args) => (
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
const ThemesTemplate: Story<ControlProps> = (args) => (
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

Default.args = {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="yc-icon ServiceIcon" fill="currentColor" stroke="none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path d="M1 2H0v12h16v-2H1V2zm11.5 5.5L9 4 5.5 7.5 2 4v7h14V4l-3.5 3.5z"></path>
</svg></svg>`,
    theme: 'primary',
    size: 's',
    iconSize: 16,
};

SizesThemes.args = {
    iconSize: 16,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="yc-icon ServiceIcon" fill="currentColor" stroke="none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path d="M1 2H0v12h16v-2H1V2zm11.5 5.5L9 4 5.5 7.5 2 4v7h14V4l-3.5 3.5z"></path>
</svg></svg>`,
};
