# HeroBlock Usage

This document outlines how the HeroBlock is used and its architecture in the page-constructor project.

## Overview

The HeroBlock is a prominent page section component designed for hero-style layouts. It combines a content area (title, text, buttons, links) with optional right-side media and a full-width background. It supports theme-aware properties, responsive behavior, and breadcrumb navigation.

## Component Architecture

```tsx
<header className={b()}>
    {/* Optional full-width background (Media as background) */}
    {background && (
        <Media className={b('background', {'full-width': fullWidth})} {...background} isBackground />
    )}

    <Grid>
        <div className={b('wrapper')}>
            {/* Optional breadcrumbs */}
            {breadcrumbs && <HeaderBreadcrumbs {...breadcrumbs} theme={theme} />}

            <div className={b('content', {'vertical-offset': verticalOffset, 'no-media': !media})}>
                {/* Optional overtitle (string → YFMWrapper, or JSX.Element) */}
                {overtitle && <div className={b('content-overtitle', {theme})}>{...}</div>}

                {/* Content sub-block: title, text, list, additionalInfo, links, buttons */}
                <Content size="xl" colSizes={{all: 12}} {...contentProps} buttons={buttonProps} theme={contentTheme} />
            </div>

            {/* Optional right-side media */}
            {media && (
                <div className={b('media')}>
                    <div className={b('media-container')} ref={mediaContainerRef}>
                        <Media
                            className={b('media-container-content', {
                                'round-corners': media.roundCorners ?? true,
                                vertical: isDesktop && isMediaVertical,
                            })}
                            {...media}
                            disablePlayerAutoSizing
                            onIntrinsicSizeChange={onMediaIntrinsicSizeChange}
                        />
                    </div>
                </div>
            )}
        </div>
    </Grid>
</header>
```

## Key Features

### Theme Support

- **`theme` prop**: Accepts `'default'` (inherits from context), `'light'`, or `'dark'`.
- **`ThemeSupporting<T>`**: The `buttons`, `media`, and `background` props all accept themed variants that resolve based on the active theme via `getThemedValue()`.
- Buttons are resolved per-theme and default to `size: 'xl'`.

### Responsive Design

- **`useWindowWidth()`** + **`BREAKPOINTS.md`**: Determines desktop vs. mobile layout.
- **`useContainerAspectRatio()`**: A custom hook that tracks the media container's aspect ratio via `ResizeObserver` to decide whether the media should be rendered in a vertical orientation on desktop.
- **`mediaAspectRatio` state**: Tracks the intrinsic aspect ratio of the media content via `onIntrinsicSizeChange`.

### Overtitle

- Supports both `string` (rendered as YFM via `YFMWrapper`) and `JSX.Element`.
- Displayed above the main content area with theme-aware styling.

### Background

- Rendered as a `<Media>` component with `isBackground` flag.
- Supports `fullWidth` mode for edge-to-edge backgrounds.
- Accepts images, videos, and a `color` fallback via `HeroBlockBackground`.

### Vertical Offset

- Controls spacing via BEM modifier: `'s' | 'm' | 'l' | 'xl'` (default `'m'`).

## Usage Examples

### Basic HeroBlock

```tsx
<HeroBlock
  title="Welcome to Our Platform"
  text="Build amazing experiences with our tools."
  buttons={[{text: 'Get Started', url: '/start', theme: 'action'}]}
/>
```

### With Media

```tsx
<HeroBlock
  title="See It In Action"
  text="Watch our product demo."
  media={{
    image: '/images/hero-demo.png',
    roundCorners: true,
  }}
/>
```

### With Themed Properties

```tsx
<HeroBlock
  title="Theme-Aware Hero"
  text="Adapts to light and dark themes."
  theme="default"
  background={{
    light: {image: '/images/bg-light.png', color: '#fff'},
    dark: {image: '/images/bg-dark.png', color: '#1a1a1a'},
  }}
  buttons={[
    {
      light: {text: 'Learn More', url: '/learn', theme: 'outlined'},
      dark: {text: 'Learn More', url: '/learn', theme: 'outlined-info'},
    },
  ]}
/>
```

### With Breadcrumbs and Overtitle

```tsx
<HeroBlock
  breadcrumbs={{
    items: [
      {text: 'Home', url: '/'},
      {text: 'Products', url: '/products'},
      {text: 'Current Product'},
    ],
  }}
  overtitle="New Release"
  title="Product Name"
  text="Detailed product description."
  buttons={[{text: 'Buy Now', url: '/buy', theme: 'action', primary: true}]}
  media={{video: {src: ['/videos/product.mp4']}}}
  verticalOffset="l"
/>
```

### Full-Width Background with Video

```tsx
<HeroBlock
  title="Immersive Experience"
  text="Full-width video background hero."
  fullWidth
  background={{
    video: {src: ['/videos/hero-bg.mp4']},
    color: '#000',
  }}
  theme="dark"
/>
```

## Props Reference

| Prop             | Type                                          | Default     | Description                                |
| ---------------- | --------------------------------------------- | ----------- | ------------------------------------------ |
| `title`          | `TitleItemBaseProps \| string`                | —           | Main title                                 |
| `text`           | `string`                                      | —           | Body text (YFM)                            |
| `list`           | `ContentItemProps[]`                          | —           | Content list items                         |
| `additionalInfo` | `string`                                      | —           | Additional info below text                 |
| `links`          | `LinkProps[]`                                 | —           | Links rendered below content               |
| `theme`          | `ContentTheme`                                | `'default'` | Theme override                             |
| `breadcrumbs`    | `HeaderBreadCrumbsProps`                      | —           | Breadcrumb navigation                      |
| `overtitle`      | `string \| JSX.Element`                       | —           | Content above the title                    |
| `buttons`        | `ThemeSupporting<ButtonProps \| ReactNode>[]` | —           | CTA buttons (themed, default `size: 'xl'`) |
| `media`          | `ThemeSupporting<HeroBlockMedia>`             | —           | Right-side media                           |
| `fullWidth`      | `boolean`                                     | —           | Full-width background flag                 |
| `verticalOffset` | `'s' \| 'm' \| 'l' \| 'xl'`                   | `'m'`       | Vertical spacing                           |
| `background`     | `ThemeSupporting<HeroBlockBackground>`        | —           | Background media/color                     |

## Best Practices

1. **Theme Variants**: Provide both light and dark variants for `background`, `media`, and `buttons` when the hero will be displayed in both themes.
2. **Vertical Offset**: Use `'l'` or `'xl'` for hero sections with substantial text content; `'s'` for compact banners.
3. **Background vs. Media**: `background` is rendered behind the entire hero as a visual backdrop; `media` is displayed as a distinct content element beside the text.
4. **Round Corners**: Media `roundCorners` defaults to `true`; explicitly set to `false` for edge-to-edge media within the media container.
5. **Overtitle**: Use strings for simple labels (auto-rendered as YFM); pass JSX for custom components.
