# Banner Block Dependencies

This document outlines the dependency graph for the Banner block, showing its relationships with other blocks, sub-blocks, components, and contexts.

## Dependency Graph

```mermaid
graph TD
    %% Main Block
    Banner[Banner Block]

    %% Sub-blocks
    BannerCard[BannerCard Sub-block]

    %% Components (Only those available in Storybook)
    AnimateBlock[AnimateBlock Component]
    BackgroundImage[BackgroundImage Component]
    Button[Button Component]
    YFMWrapper[YFMWrapper Component]
    Image[Image Component]

    %% Dependencies for Banner Block
    Banner --> BannerCard
    Banner --> AnimateBlock

    %% Dependencies for BannerCard
    BannerCard --> BackgroundImage
    BannerCard --> Button
    BannerCard --> YFMWrapper

    %% Secondary dependencies
    BackgroundImage --> Image

    %% Style classes
    style Banner fill:#f9d77e,stroke:#f9bc02,stroke-width:2px,color:#000
    style BannerCard fill:#f9d77e,stroke:#f9bc02,stroke-width:2px,color:#000

    %% Component styles
    style AnimateBlock fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style BackgroundImage fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style Button fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style YFMWrapper fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style Image fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
```

## Component Details

### Banner Block

- **File**: `src/blocks/Banner/Banner.tsx`
- **Description**: A block component that wraps the BannerCard sub-block with animation capabilities.
- **Props**: `BannerBlockProps` which extends `BannerCardProps` and adds `animated` property.

### BannerCard Sub-block

- **File**: `src/sub-blocks/BannerCard/BannerCard.tsx`
- **Description**: Renders a banner with title, subtitle, background image, and a call-to-action button.
- **Props**: `BannerCardProps` including title, subtitle, image, color, theme, button properties.

## Key Dependencies (Available in Storybook)

### Components

- **AnimateBlock**: Provides animation capabilities when elements enter the viewport.
- **BackgroundImage**: Renders background images with optional compression.
- **Button**: Renders styled buttons with various themes and sizes.
- **YFMWrapper**: Renders Yandex Flavored Markdown content.
- **Image**: Renders images with various options (used by BackgroundImage).
