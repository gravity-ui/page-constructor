import * as React from 'react';

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
    <React.Fragment>
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
    </React.Fragment>
);

const ExtensionsTemplate: StoryFn<Record<number, FileLinkProps>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((item, index) => (
            <Row key={index} style={{padding: '10px'}}>
                <Col>
                    <FileLink {...item} />
                </Col>
            </Row>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const TypesThemes = TypesThemesTemplate.bind({});
export const Extensions = ExtensionsTemplate.bind([]);

Default.args = data.default.content as FileLinkProps;
TypesThemes.args = data.typesThemes.content as FileLinkProps;

const EXTENSIONS: FileLinkProps[] = [
    {...data.extensions.content, href: 'example.pdf'},
    {...data.extensions.content, href: 'example.doc'},
    {...data.extensions.content, href: 'example.xls'},
    {...data.extensions.content, href: 'example.ppt'},
    {...data.extensions.content, href: 'example.fig'},
    {...data.extensions.content, href: 'example.zip'},
];

Extensions.args = EXTENSIONS;
Extensions.parameters = {
    controls: {
        include: Object.keys(EXTENSIONS),
    },
};
