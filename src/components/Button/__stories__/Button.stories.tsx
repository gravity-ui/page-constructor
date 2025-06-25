import {Meta, StoryFn} from '@storybook/react';
import {ArrowDown, Check, Plus} from '@gravity-ui/icons';
import {IconData} from '@gravity-ui/uikit';

import {Col, Grid, Row} from '../../../grid';
import Button, {ButtonProps} from '../Button';
import {CONTRAST_THEMES, SIZES, THEMES} from './constants';
import data from './data.json';
import './Button.stories.scss';

export default {
    component: Button,
    title: 'Components/Links and buttons/Button',
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
                <Button key="check-left" {...args} img={createIconConfig(Check)} text="Check" />,
                <Button
                    key="arrow-right"
                    {...args}
                    img={createIconConfig(ArrowDown, 'right')}
                    text="Download"
                />,
                <Button
                    key="check-small"
                    {...args}
                    img={createIconConfig(Check, 'left', 14)}
                    text="Check"
                />,
                <Button
                    key="check-large"
                    {...args}
                    img={createIconConfig(Check, 'left', 20)}
                    text="Check"
                />,
            ])}

            {createButtonRow('Custom SVG', [
                <Button
                    key="star-left"
                    {...args}
                    img={createIconConfig(iconExamples.starSvg)}
                    text="Star"
                />,
                <Button
                    key="diamond-right"
                    {...args}
                    img={createIconConfig(iconExamples.diamondSvg, 'right')}
                    text="Diamond"
                />,
                <Button
                    key="star-small"
                    {...args}
                    img={createIconConfig(iconExamples.starSvg, 'left', 14)}
                    text="Star"
                />,
                <Button
                    key="star-large"
                    {...args}
                    img={createIconConfig(iconExamples.starSvg, 'left', 20)}
                    text="Star"
                />,
            ])}

            {createButtonRow('Styled Icons', [
                <Button
                    key="green-check"
                    {...args}
                    img={createIconConfig(
                        iconExamples.starSvg,
                        'left',
                        16,
                        iconExamples.classes.green,
                    )}
                    text="Green"
                />,
                <Button
                    key="red-plus"
                    {...args}
                    img={createIconConfig(Plus, 'right', 16, iconExamples.classes.red)}
                    text="Red Plus"
                />,
                <Button
                    key="blue-arrow"
                    {...args}
                    img={createIconConfig(ArrowDown, 'left', 16, iconExamples.classes.blue)}
                    text="Blue"
                />,
                <Button
                    key="url-icon"
                    {...args}
                    img={{url: iconExamples.customUrl, position: 'left'}}
                    text="URL"
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
