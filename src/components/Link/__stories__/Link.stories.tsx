import {Meta, Story} from '@storybook/react/types-6-0';
import React, {Fragment} from 'react';

import Link, {LinkFullProps} from '../Link';
import {Col, Row} from '../../../grid';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';
import Section from '../../Section/Section';

export default {
    component: Link,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/Link`,
} as Meta;

const DefaultTemplate: Story<LinkFullProps> = (args) => <Link {...args} />;
const DarkTemplate: Story<LinkFullProps> = (args) => (
    <Section background={{color: '#3a74ff'}}>
        <Link {...args} />
    </Section>
);
const SizesTemplate: Story<LinkFullProps> = (args) => (
    <Row>
        <Col>{args.theme}</Col>
        <Col>
            <Link text="Ссылка размера s" {...args} textSize="s" />
        </Col>
        <Col>
            <Link text="Ссылка размера m" {...args} textSize="m" />
        </Col>
        <Col>
            <Link text="Ссылка размера l" {...args} textSize="l" />
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
            Ссылка с children-ом
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

Default.args = {
    text: 'Ссылка по умолчанию',
    url: '#',
};

ThemesSizes.args = {
    text: 'Ссылка',
    url: '#',
};

NormalWithChildren.args = {
    url: '#',
    theme: 'normal',
};

NormalArrow.args = {
    text: 'Normal ссылка со стрелкой',
    url: '#',
    arrow: true,
    theme: 'normal',
};

NormalForDarkTheme.args = {
    text: 'Normal ссылка',
    url: '#',
    theme: 'normal',
    colorTheme: 'dark',
};

UnderlineWithChildren.args = {
    url: '#',
    theme: 'underline',
};

BackWithChildren.args = {
    url: '#',
    theme: 'back',
};
