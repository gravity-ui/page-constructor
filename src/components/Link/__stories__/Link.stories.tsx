import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Col, GridAlignItems, Row} from '../../../grid';
import Link, {LinkFullProps} from '../Link';

import data from './data.json';

export default {
    component: Link,
    title: 'Components/Links and buttons/Link',
} as Meta;

const THEMES_SIZES = ['normal', 'underline', 'back', 'file-link'].map((theme) =>
    ['s', 'm', 'l'].map((textSize) => ({
        theme,
        textSize,
        ...data.themesSizes,
    })),
);

const DefaultTemplate: StoryFn<LinkFullProps> = (args) => <Link {...args} />;
const DarkTemplate: StoryFn<LinkFullProps> = (args) => (
    <section style={{backgroundColor: '#7ccea0', display: 'inline-block', padding: '0 16px 16px'}}>
        <Link {...args} />
    </section>
);
const SizesTemplate: StoryFn<Record<number, LinkFullProps>> = (args) => (
    <Row alignItems={GridAlignItems.End}>
        <Col>{args[0].theme}</Col>
        {Object.values(args).map((itemArgs, index) => (
            <Col key={index}>
                <Link {...itemArgs} />
            </Col>
        ))}
    </Row>
);
const ThemesSizesTemplate: StoryFn<Record<number, Record<number, LinkFullProps>>> = (args) => (
    <React.Fragment>
        <Row>
            <Col />
            <Col>{args[0][0].textSize}</Col>
            <Col>{args[0][1].textSize}</Col>
            <Col>{args[0][2].textSize}</Col>
        </Row>
        <SizesTemplate {...args[0]} />
        <SizesTemplate {...args[1]} />
        <SizesTemplate {...args[2]} />
        <SizesTemplate {...args[3]} />
    </React.Fragment>
);

const WithChildrenTemplate: StoryFn<LinkFullProps> = (args) => (
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
export const ThemesSizes = ThemesSizesTemplate.bind([[]]);
ThemesSizes.parameters = {
    controls: {
        include: Object.keys(THEMES_SIZES),
    },
};
export const NormalWithChildren = WithChildrenTemplate.bind({});
export const NormalArrow = SizesTemplate.bind([]);
NormalArrow.parameters = {
    controls: {
        include: Object.keys(data.normalArrows),
    },
};

export const NormalForDarkTheme = DarkTemplate.bind({});
export const UnderlineWithChildren = WithChildrenTemplate.bind({});
export const BackWithChildren = WithChildrenTemplate.bind({});

Default.args = data.default.content;
ThemesSizes.args = THEMES_SIZES as LinkFullProps[][];
NormalWithChildren.args = data.normalWithChildren.content as LinkFullProps;
NormalArrow.args = data.normalArrows as LinkFullProps[];
NormalForDarkTheme.args = data.normalForDarkTheme.content as LinkFullProps;
UnderlineWithChildren.args = data.underlineWithChildren.content as LinkFullProps;
BackWithChildren.args = data.backWithChildren.content as LinkFullProps;
