import {Meta, Story} from '@storybook/react/types-6-0';
import React, {Fragment} from 'react';

import {FileLink} from '../../index';
import {FileLinkProps} from '../../../models';
import {Col, Row} from '../../../grid';
import {BUTTONS_LINKS, COMPONENTS} from '../../../constants';
import Section from '../../Section/Section';

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
        <Section background={{color: '#3a74ff'}}>
            <TypesTemplate {...args} theme="dark" />
        </Section>
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const TypesThemes = TypesThemesTemplate.bind({});

Default.args = {
    href: 'qwe.pdf',
    text: 'Ссылка на файл',
};

TypesThemes.args = {
    href: 'qwe.pdf',
    text: 'Ссылка на файл',
};
