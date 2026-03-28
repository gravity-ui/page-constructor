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

const TypesThemesTemplate: StoryFn<Record<string, FileLinkProps>> = (args) => (
    <React.Fragment>
        <Row style={{padding: '10px'}}>
            <Col />
            <Col>horizontal</Col>
            <Col>vertical</Col>
        </Row>
        {Object.entries(args).map(([key, item]) => (
            <TypesTemplate key={key} {...item} />
        ))}
    </React.Fragment>
);

const ExtensionsTemplate: StoryFn<Record<string, FileLinkProps>> = (args) => (
    <React.Fragment>
        {Object.entries(args).map(([key, item]) => (
            <Row key={key} style={{padding: '10px'}}>
                <Col>
                    <FileLink {...item} />
                </Col>
            </Row>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const TypesThemes = TypesThemesTemplate.bind({});
export const Extensions = ExtensionsTemplate.bind({});

Default.args = data.default.content as FileLinkProps;

const TYPES_THEMES: Record<string, FileLinkProps> = {
    default: {
        ...data.typesThemes.content,
        theme: 'default',
    } as FileLinkProps,
    light: {
        ...data.typesThemes.content,
        theme: 'light',
    } as FileLinkProps,
    dark: {
        ...data.typesThemes.content,
        theme: 'dark',
    } as FileLinkProps,
};

TypesThemes.args = TYPES_THEMES;
TypesThemes.parameters = {
    controls: {
        include: Object.keys(TYPES_THEMES),
    },
};

const EXTENSIONS: Record<string, FileLinkProps> = {
    pdf: {
        ...data.extensions.content,
        href: 'example.pdf',
    } as FileLinkProps,
    doc: {
        ...data.extensions.content,
        href: 'example.doc',
    } as FileLinkProps,
    xls: {
        ...data.extensions.content,
        href: 'example.xls',
    } as FileLinkProps,
    ppt: {
        ...data.extensions.content,
        href: 'example.ppt',
    } as FileLinkProps,
    fig: {
        ...data.extensions.content,
        href: 'example.fig',
    } as FileLinkProps,
    zip: {
        ...data.extensions.content,
        href: 'example.zip',
    } as FileLinkProps,
};

Extensions.args = EXTENSIONS;
Extensions.parameters = {
    controls: {
        include: Object.keys(EXTENSIONS),
    },
};
