import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Col, Grid, GridAlignItems, Row} from '../../../grid';
import Button, {ButtonProps} from '../Button';

import {CONTRAST_THEMES, SIZES, THEMES} from './constants';

import data from './data.json';

import './Button.stories.scss';

export default {
    component: Button,
    title: 'Components/Links and buttons/Button',
} as Meta;

const THEMES_SIZES = [...THEMES, ...CONTRAST_THEMES].map((theme) =>
    SIZES.map((size) => ({
        size,
        theme,
        ...data.themesSizes,
    })),
);

const ICON_VARIANTS = [
    {iconData: 'Plus'},
    {iconData: data.iconExamples.signatureSvg},
    {url: data.iconExamples.customUrl},
].map((source) =>
    [{position: 'left'}, {position: 'right'}, {iconSize: 14}, {iconSize: 20}].map((props) => ({
        img: {
            ...source,
            ...props,
        },
        ...data.withIcon,
    })),
);
const ICON_SOURCES = ['Gravity UI', 'Custom SVG', 'Img URL'];

const DefaultTemplate: StoryFn<ButtonProps> = (args) => <Button {...args} />;

const SizesTemplate: StoryFn<Record<number, ButtonProps>> = (args) => (
    <Row
        alignItems={GridAlignItems.End}
        style={{
            background: CONTRAST_THEMES.includes(args[0].theme as (typeof CONTRAST_THEMES)[number])
                ? 'rgb(58, 116, 255)'
                : 'transparent',
            padding: '10px 0',
        }}
    >
        <Col>{args[0].theme}</Col>
        {Object.values(args).map((itemArgs, index) => (
            <Col key={index}>
                <Button {...itemArgs} />
            </Col>
        ))}
    </Row>
);

const ThemesSizesTemplate: StoryFn<Record<number, Record<number, ButtonProps>>> = (args) => (
    <React.Fragment>
        <Grid>
            <Row>
                <Col />
                {Object.values(args[0]).map((arg, index) => (
                    <Col key={index}>{arg.size}</Col>
                ))}
            </Row>
            {Object.values(args).map((arg, index) => (
                <SizesTemplate key={index} {...arg} />
            ))}
        </Grid>
    </React.Fragment>
);

const VariantsTemplate: StoryFn<Record<number, ButtonProps>> = (args) => (
    <Row>
        {Object.values(args).map((arg, index) => (
            <Col key={index}>
                <Button {...arg} />
            </Col>
        ))}
    </Row>
);

const IconTemplate: StoryFn<Record<number, Record<number, ButtonProps>>> = (args) => (
    <React.Fragment>
        <Grid>
            <Row>
                <Col />
                <Col>Left</Col>
                <Col>Right</Col>
                <Col>Small</Col>
                <Col>Large</Col>
            </Row>
            {Object.values(args).map((arg, index) => (
                <Row
                    key={index}
                    alignItems={GridAlignItems.End}
                    style={{
                        background: CONTRAST_THEMES.includes(
                            arg[0].theme as (typeof CONTRAST_THEMES)[number],
                        )
                            ? 'rgb(58, 116, 255)'
                            : 'transparent',
                        padding: '10px 0',
                    }}
                >
                    <Col>{ICON_SOURCES[index]}</Col>
                    {Object.values(arg).map((itemArgs, indexInner) => (
                        <Col key={indexInner}>
                            <Button {...itemArgs} />
                        </Col>
                    ))}
                </Row>
            ))}
        </Grid>
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind([[]]);
ThemesSizes.parameters = {
    controls: {
        include: Object.keys(THEMES_SIZES),
    },
};
export const Width = VariantsTemplate.bind([]);
Width.parameters = {
    controls: {
        include: Object.keys(data.width),
    },
};
export const Icons = IconTemplate.bind([[]]);
Icons.parameters = {
    controls: {
        include: Object.keys(ICON_VARIANTS),
    },
};

Default.args = data.default as ButtonProps;
ThemesSizes.args = THEMES_SIZES as ButtonProps[][];
Width.args = data.width as ButtonProps[];
Icons.args = ICON_VARIANTS as ButtonProps[][];
