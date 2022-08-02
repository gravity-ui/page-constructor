import {Meta, Story} from '@storybook/react/types-6-0';
import React, {Fragment} from 'react';

import {FileLink} from '../../index';
import {FileLinkProps} from '../../../models';
import {Col, Row} from '../../../grid';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';

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

Default.args = {
    href: 'qwe.pdf',
    text: 'Ссылка на файл',
};

TypesThemes.args = {
    href: 'qwe.pdf',
    text: 'Ссылка на файл',
};

Extensions.args = {
    text: 'Ссылка на файл',
};
