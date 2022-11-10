import {Meta, Story} from '@storybook/react/types-6-0';
import React, {Fragment} from 'react';

import Link, {LinkFullProps} from '../Link';
import {Col, Row} from '../../../grid';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';

import {LinkProps} from 'src/models';

import data from './data.json';

const getSizesTitle = (size: string) => data.themesSizes.title.replace('{{size}}', size);

export default {
    component: Link,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/Link`,
} as Meta;

const DefaultTemplate: Story<LinkFullProps> = (args) => <Link {...args} />;
const DarkTemplate: Story<LinkFullProps> = (args) => (
    <section style={{backgroundColor: '#7ccea0', display: 'inline-block', padding: '0 16px 16px'}}>
        <Link {...args} />
    </section>
);
const SizesTemplate: Story<LinkFullProps> = (args) => (
    <Row>
        <Col>{args.theme}</Col>
        <Col>
            <Link text={getSizesTitle('s')} {...args} textSize="s" />
        </Col>
        <Col>
            <Link text={getSizesTitle('m')} {...args} textSize="m" />
        </Col>
        <Col>
            <Link text={getSizesTitle('l')} {...args} textSize="l" />
        </Col>
    </Row>
);
const ThemesSizesTemplate: Story<LinkFullProps> = (args) => (
    <Fragment>
        <Row>
            <Col />
            <Col>s</Col>
            <Col>m</Col>
            <Col>l</Col>
        </Row>
        <SizesTemplate {...args} theme="normal" />
        <SizesTemplate {...args} theme="underline" />
        <SizesTemplate {...args} theme="back" />
        <SizesTemplate {...args} theme="file-link" />
    </Fragment>
);

const WithChildrenTemplate: Story<LinkFullProps> = (args) => (
    <Link {...args}>
        <span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                fill="currentColor"
                stroke="none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M4 5.38V1.05c-2.28.23-4 1.24-4 2.45v9C0 13.88 2.24 15 5 15s5-1.12 5-2.5V12a6.63 6.63 0 0 1-6-6.62z" />
                    <path d="M10 0H5v5.38A5.61 5.61 0 0 0 10.62 11H14v1h-2v4h4V6a6 6 0 0 0-6-6zm3 9h-2V7h2z" />
                </svg>
            </svg>{' '}
            {data.normalWithChildren.children}
        </span>
    </Link>
);

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind({});
export const NormalWithChildren = WithChildrenTemplate.bind({});
export const NormalArrow = DefaultTemplate.bind({});
export const NormalForDarkTheme = DarkTemplate.bind({});
export const UnderlineWithChildren = WithChildrenTemplate.bind({});
export const BackWithChildren = WithChildrenTemplate.bind({});

Default.args = data.default.content;
ThemesSizes.args = data.themesSizes.content;
NormalWithChildren.args = data.normalWithChildren.content as LinkProps;
NormalArrow.args = data.normalArrow.content as LinkProps;
NormalForDarkTheme.args = data.normalForDarkTheme.content as LinkProps;
UnderlineWithChildren.args = data.underlineWithChildren.content as LinkProps;
BackWithChildren.args = data.backWithChildren.content as LinkProps;
