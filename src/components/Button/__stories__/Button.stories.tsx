import {IconData} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {Col, Grid, Row} from '../../../grid';
import Button, {ButtonProps} from '../Button';

import {CONTRAST_THEMES, SIZES, THEMES} from './constants';

import data from './data.json';

import './Button.stories.scss';

export default {
    component: Button,
    title: 'Components/Links and buttons/Button',
    args: {
        text: 'Button',
        size: 'l',
    },
    argTypes: {
        size: {
            control: {
                type: 'select',
            },
            options: SIZES,
        },
    },
} as Meta;

const createIconConfig = (
    iconData: IconData,
    position?: 'left' | 'right',
    iconSize?: number,
    className?: string,
) => ({iconData, position, iconSize, className});

const createButtonRow = (label: string, buttons: React.ReactNode[]) => (
    <Row>
        <Col style={{margin: '20px 0'}}>{label}</Col>
        {buttons.map((button, index) => (
            <Col key={index}>{button}</Col>
        ))}
    </Row>
);

const DefaultTemplate: StoryFn<ButtonProps> = (args) => <Button {...args} />;

const SizesTemplate: StoryFn<ButtonProps> = (args) => (
    <Row>
        <Col style={{margin: '20px 0'}}>{args.theme}</Col>
        {SIZES.map((size) => (
            <Col key={size}>
                <Button {...args} size={size} />
            </Col>
        ))}
    </Row>
);

const ThemesSizesTemplate: StoryFn<ButtonProps> = (args) => (
    <Grid>
        <Row>
            <Col />
            {SIZES.map((size) => (
                <Col key={size}>{size}</Col>
            ))}
        </Row>
        {THEMES.map((theme) => (
            <SizesTemplate key={theme} {...args} theme={theme} />
        ))}
        <section style={{color: '#fff', background: '#3a74ff'}}>
            {CONTRAST_THEMES.map((theme) => (
                <SizesTemplate key={theme} {...args} theme={theme} />
            ))}
        </section>
    </Grid>
);

const WidthTemplate: StoryFn<ButtonProps> = (args) => (
    <Row>
        <Col>
            <Button {...args} width="auto" />
        </Col>
        <Col>
            <Button {...args} width="max" />
        </Col>
    </Row>
);

const IconTemplate: StoryFn<ButtonProps> = (args) => {
    const {iconExamples} = data;

    return (
        <Grid>
            <Row>
                <Col>Source</Col>
                <Col>Left</Col>
                <Col>Right</Col>
                <Col>Small</Col>
                <Col>Large</Col>
            </Row>

            {createButtonRow('Gravity UI', [
                <Button key="plus-left" {...args} img={createIconConfig('Plus')} text="Button" />,
                <Button
                    key="plus-right"
                    {...args}
                    img={createIconConfig('Plus', 'right')}
                    text="Button"
                />,
                <Button
                    key="plus-small"
                    {...args}
                    img={createIconConfig('Plus', 'left', 14)}
                    text="Button"
                />,
                <Button
                    key="plus-large"
                    {...args}
                    img={createIconConfig('Plus', 'left', 20)}
                    text="Button"
                />,
            ])}

            {createButtonRow('Custom SVG', [
                <Button
                    key="signature-left"
                    {...args}
                    img={createIconConfig(iconExamples.signatureSvg)}
                    text="Button"
                />,
                <Button
                    key="signature-right"
                    {...args}
                    img={createIconConfig(iconExamples.signatureSvg, 'right')}
                    text="Button"
                />,
                <Button
                    key="signature-small"
                    {...args}
                    img={createIconConfig(iconExamples.signatureSvg, 'left', 14)}
                    text="Button"
                />,
                <Button
                    key="signature-large"
                    {...args}
                    img={createIconConfig(iconExamples.signatureSvg, 'left', 20)}
                    text="Button"
                />,
            ])}

            {createButtonRow('Img URL', [
                <Button
                    key="gravity-left"
                    {...args}
                    img={{url: iconExamples.customUrl, position: 'left'}}
                    text="Button"
                />,
                <Button
                    key="gravity-right"
                    {...args}
                    img={{url: iconExamples.customUrl, position: 'right'}}
                    text="Button"
                />,
                <Button
                    key="gravity-small"
                    {...args}
                    img={{url: iconExamples.customUrl, position: 'left', iconSize: 14}}
                    text="Button"
                />,
                <Button
                    key="gravity-large"
                    {...args}
                    img={{url: iconExamples.customUrl, position: 'left', iconSize: 20}}
                    text="Button"
                />,
            ])}
        </Grid>
    );
};

export const Default = DefaultTemplate.bind({});
export const ThemesSizes = ThemesSizesTemplate.bind({});
export const Width = WidthTemplate.bind({});
export const Icons = IconTemplate.bind({});

Default.args = data.default.content as ButtonProps;
ThemesSizes.args = data.themesSizes.content as ButtonProps;
Width.args = data.themesSizes.content as ButtonProps;
Icons.args = data.withIcon.content as ButtonProps;
