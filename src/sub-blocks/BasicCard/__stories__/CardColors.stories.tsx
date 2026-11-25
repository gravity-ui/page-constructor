import * as React from 'react';

import {Source} from '@storybook/blocks';
import {Meta, StoryFn} from '@storybook/react';
import {ThemeProvider, convert, themes} from '@storybook/theming';

import {useTheme} from '../../../context/theme/useTheme';
import {block} from '../../../utils/cn';
import BasicCard from '../BasicCard';

import './colors.scss';

const b = block('card-colors-story');
const borders = ['shadow', 'line', 'none'] as const;

const formatTokens = (tokens: Record<string, string>) =>
    Object.entries(tokens)
        .map(([name, value]) => `${name}: ${value};`)
        .join('\n');

export default {
    title: 'Lab/Tokenization/Examples/Cards',
    parameters: {
        controls: {disable: true},
    },
} as Meta;

const CardColors = ({scope}: {scope: 'default' | 'custom'}) => {
    const dark = useTheme() === 'dark';
    const backgroundTokens = {
        '--pc-card-background-color': dark ? '#30343b' : '#eff2f8',
        '--pc-card-background-color-hover': dark ? '#3d434d' : '#e3e8f2',
    };
    const outlinedTokens = {
        '--pc-card-outlined-background-color': 'transparent',
        '--pc-card-outlined-background-color-hover': 'transparent',
        '--pc-card-border-color': dark ? '#ffffff99' : '#00000099',
        '--pc-card-border-color-hover': dark ? '#ffffff' : '#000000',
    };
    const customStyle = {
        ...backgroundTokens,
        ...outlinedTokens,
        '--card-colors-section-background': dark ? '#25282d' : '#f6f8fb',
    } as React.CSSProperties;

    return (
        <section
            className={b({custom: scope === 'custom'})}
            style={scope === 'custom' ? customStyle : undefined}
            data-qa={`${scope}-colors`}
            aria-label={scope === 'default' ? 'Default tokens' : 'Custom section'}
        >
            <div className={b('grid', {cards: true})}>
                {borders.map((value) => (
                    <BasicCard
                        key={value}
                        title={`Border: ${value}`}
                        gravityIcon={{
                            name: 'Display',
                            color: scope === 'default' ? 'brand' : 'text-color',
                        }}
                        text="We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future."
                        border={value}
                        url="#card-colors"
                    />
                ))}
            </div>
            <ThemeProvider theme={convert(dark ? themes.dark : themes.light)}>
                <div className={b('grid', {tokens: true})}>
                    <Source
                        language="css"
                        dark={dark}
                        code={
                            scope === 'default'
                                ? '--pc-card-background-color: var(--g-color-base-float);\n--pc-card-background-color-hover: var(--pc-color-base-float-hover);'
                                : formatTokens(backgroundTokens)
                        }
                    />
                    <Source
                        language="css"
                        dark={dark}
                        code={
                            scope === 'default'
                                ? '--pc-card-outlined-background-color: var(--g-color-base-float);\n--pc-card-outlined-background-color-hover: var(--g-color-base-float);\n--pc-card-border-color: var(--g-color-line-generic);\n--pc-card-border-color-hover: var(--g-color-line-generic);'
                                : formatTokens(outlinedTokens)
                        }
                    />
                    <Source
                        language="css"
                        dark={dark}
                        code={
                            scope === 'default'
                                ? '--pc-card-background-color: var(--g-color-base-float);\n--pc-card-background-color-hover: var(--g-color-base-float);'
                                : formatTokens(backgroundTokens)
                        }
                    />
                </div>
            </ThemeProvider>
        </section>
    );
};

export const DefaultTokens: StoryFn = () => <CardColors scope="default" />;

export const Custom: StoryFn = () => <CardColors scope="custom" />;

Custom.storyName = 'Custom tokens';
