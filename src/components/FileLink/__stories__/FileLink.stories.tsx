import React, {Fragment} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Col, Row} from '../../../grid';
import {FileLinkProps} from '../../../models';
import {FileLink} from '../../index';

import data from './data.json';

export default {
    component: FileLink,
    title: 'Components/Links and buttons/FileLink',
} as Meta;

const DefaultTemplate: StoryFn<FileLinkProps> = (args) => <FileLink {...args} />;
const TypesTemplate: StoryFn<FileLinkProps> = (args) => (
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

const TypesThemesTemplate: StoryFn<FileLinkProps> = (args) => (
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

const WithPaddingTemplate: StoryFn<FileLinkProps> = (args) => (
    <Row style={{padding: '10px'}}>
        <Col>
            <FileLink {...args} />
        </Col>
    </Row>
);

const ExtTemplate: StoryFn<FileLinkProps> = (args) => (
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
