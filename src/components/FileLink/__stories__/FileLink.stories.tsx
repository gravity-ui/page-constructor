import React, {Fragment} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';
import {Col, Row} from '../../../grid';
import {FileLinkProps} from '../../../models';
import {FileLink} from '../../index';

import data from './data.json';

export default {
    component: FileLink,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/FileLink`,
} as Meta;

const DefaultTemplate: Story<FileLinkProps> = (args) => <FileLink {...args} />;
const TypesTemplate: Story<FileLinkProps> = (args) => (
    <Row style={{padding: '10px'}}>
        <Col>{args.theme}</Col>
        <Col>
            <FileLink {...args} type="horizontal" />
        </Col>
        <Col>
            <FileLink {...args} type="vertical" />
        </Col>
    </Row>
);

const TypesThemesTemplate: Story<FileLinkProps> = (args) => (
    <Fragment>
        <Row style={{padding: '10px'}}>
            <Col />
            <Col>horizontal</Col>
            <Col>vertical</Col>
        </Row>
        <TypesTemplate {...args} theme="default" />
        <TypesTemplate {...args} theme="light" />
        <section style={{color: '#3a74ff'}}>
            <TypesTemplate {...args} theme="dark" />
        </section>
    </Fragment>
);

const WithPaddingTemplate: Story<FileLinkProps> = (args) => (
    <Row style={{padding: '10px'}}>
        <Col>
            <FileLink {...args} />
        </Col>
    </Row>
);

const ExtTemplate: Story<FileLinkProps> = (args) => (
    <Fragment>
        <WithPaddingTemplate {...args} href="example.pdf" />
        <WithPaddingTemplate {...args} href="example.doc" />
        <WithPaddingTemplate {...args} href="example.xls" />
        <WithPaddingTemplate {...args} href="example.ppt" />
        <WithPaddingTemplate {...args} href="example.fig" />
        <WithPaddingTemplate {...args} href="example.zip" />
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const TypesThemes = TypesThemesTemplate.bind({});
export const Extensions = ExtTemplate.bind({});

Default.args = data.default.content;
TypesThemes.args = data.typesThemes.content;
Extensions.args = data.extensions.content;
