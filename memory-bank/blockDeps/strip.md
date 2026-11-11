# Strip Block Dependencies

## Dependency Graph

```mermaid
graph TD
    Strip[Strip Block]
    AnimateBlock[AnimateBlock Component]
    Title[Title Component]
    Image[Image Component]
    ThemeContext[Theme Context]
    CardChildren[Card Sub-blocks]

    Strip --> AnimateBlock
    Strip --> Title
    Strip --> Image
    Strip --> ThemeContext
    Strip --> CardChildren

    style Strip fill:#f9d77e,stroke:#f9bc02,stroke-width:2px,color:#000
    style AnimateBlock fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style Title fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style Image fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style ThemeContext fill:#a8d5ba,stroke:#1a936f,stroke-width:1px,color:#000
    style CardChildren fill:#d8c4f1,stroke:#6f42c1,stroke-width:1px,color:#000
```

## Component Details

### Strip Block

- **File**: `src/blocks/Strip/Strip.tsx`
- **Description**: Displays card sub-blocks or a themed responsive image strip in wrapping or
  marquee layouts.

### Dependencies

- **AnimateBlock**: Handles the optional entrance animation.
- **Title**: Renders the optional title and YFM description.
- **Image**: Renders the desktop/tablet/mobile image sources without a card wrapper.
- **Theme Context**: Selects the light or dark image source set.
- **Card Sub-blocks**: Render through PageConstructor's standard `children` pipeline, matching the
  Slider card contract.
