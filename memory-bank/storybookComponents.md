# Storybook Components in Page Constructor

This document provides an overview of the components in the Page Constructor library that are documented and tested in Storybook.

## Overview

Storybook is used in the Page Constructor project for component documentation and visual testing. It provides a way to view and interact with components in isolation, making it easier to develop and test them.

## Components with Storybook Stories

### Base Components

The following components in the src/components directory have Storybook stories:

1. **AnimateBlock**: Provides animation capabilities when elements enter the viewport. ✅ [Usage documented](usage/animateBlock.md)
2. **Author**: Displays author information. ✅ [Usage documented](usage/author.md)
3. **BackgroundImage**: Renders background images with optional compression. ✅ [Usage documented](usage/backgroundImage.md)
4. **BackgroundMedia**: Handles background media elements. ✅ [Usage documented](usage/backgroundMedia.md)
5. **BackLink**: Provides a link to navigate back. ✅ [Usage documented](usage/backLink.md)
6. **BalancedMasonry**: Creates a balanced masonry layout. ✅ [Usage documented](usage/balancedMasonry.md)
7. **BrandFooter**: Displays a branded footer. ✅ [Usage documented](usage/brandFooter.md)
8. **Button**: Renders styled buttons with various themes and sizes. ✅ [Usage documented](usage/button.md)
9. **ContentList**: Displays a list of content items.
10. **Control**: Provides form control elements.
11. **ErrorWrapper**: Handles error display and fallbacks.
12. **FileLink**: Renders links to files with appropriate icons.
13. **FullscreenImage**: Displays images in fullscreen mode.
14. **FullscreenMedia**: Handles fullscreen media display.
15. **FullWidthBackground**: Creates full-width background elements.
16. **HeaderBreadcrumbs**: Displays breadcrumb navigation in headers.
17. **Image**: Renders images with various options.
18. **Link**: Provides styled link components.
19. **Map**: Integrates map functionality.
20. **Media**: Handles various media types.
21. **MetaInfo**: Displays metadata information.
22. **OverflowScroller**: Creates scrollable containers for overflowing content.
23. **ReactPlayer**: Wraps the react-player library for video playback.
24. **Table**: Renders table components.
25. **Title**: Displays styled title elements.
26. **ToggleArrow**: Provides toggle functionality with arrow indicators.
27. **UnpublishedLabel**: Displays a label for unpublished content.
28. **VideoBlock**: Handles video content display.
29. **YandexForm**: Integrates with Yandex Forms.
30. **YFMWrapper**: Renders Yandex Flavored Markdown content.

### Blocks

The following blocks in the src/blocks directory have Storybook stories:

1. **Banner**: A block component that displays a banner with title, subtitle, and call-to-action.
2. **CardLayout**: Provides a layout for displaying cards in a grid.
3. **Companies**: Displays a list of company logos or information.
4. **ContentLayout**: Provides a layout for content with various configurations.
5. **ExtendedFeatures**: Displays a list of features with extended information.
6. **FilterBlock**: Provides filtering functionality for content.
7. **FoldableList**: Displays a list that can be expanded or collapsed.
8. **Form**: Handles form display and submission.
9. **Header**: Displays a page header with navigation.
10. **Info**: Displays information in a structured format.
11. **Map**: Integrates map functionality into a block.
12. **Media**: Handles various media types in a block format.
13. **Questions**: Displays a list of questions and answers (FAQ).
14. **Share**: Provides social media sharing functionality.
15. **Slider**: Creates a carousel/slider for content.
16. **SliderNew**: An updated version of the Slider block.
17. **Table**: Displays tabular data in a block format.
18. **Tabs**: Provides tabbed navigation for content.

### Indents

The following component in the src/Indents directory has Storybook stories:

1. **Indents**: A component for managing spacing and indentation in layouts.

### Sub-blocks

The following sub-blocks in the src/sub-blocks directory have Storybook stories:

1. **BackgroundCard**: A sub-block for displaying content with a background.
2. **BasicCard**: A simple card sub-block for displaying content.
3. **Content**: A sub-block for displaying content in a structured format.
4. **Divider**: A sub-block for creating visual dividers between content.
5. **HubspotForm**: A sub-block for integrating Hubspot forms.
6. **ImageCard**: A sub-block for displaying images with card-like styling.
7. **LayoutItem**: A sub-block for creating layout structures.
8. **MediaCard**: A sub-block for displaying media content in a card format.
9. **PriceCard**: A sub-block for displaying pricing information.
10. **PriceDetailed**: A sub-block for displaying detailed pricing information.
11. **Quote**: A sub-block for displaying quotations.

### Containers

The following containers in the src/containers directory have Storybook stories:

1. **PageConstructor**: The main container component that renders the page based on the provided content configuration. The stories demonstrate custom blocks integration, custom navigation items, custom loadable components, and custom decorators.

### Editor

The following components in the src/editor directory have Storybook stories:

1. **Editor**: The editor container component that provides the page construction interface.

### Navigation

The following components in the src/navigation directory have Storybook stories:

1. **Navigation**: The navigation component that renders navigation items based on the provided configuration. It includes examples of custom navigation buttons and custom navigation components.

## Storybook Structure

Each component with Storybook integration typically has:

1. A **stories** directory containing:

   - A .stories.tsx file defining the component's stories
   - A data.json file with example data for the stories
   - A .mdx file for documentation (primarily for blocks)

2. Stories are organized using the Storybook component hierarchy, for example:
   - Components/Links and buttons/Button for the Button component
   - Blocks/Banner for the Banner block

## Storybook Template

The project includes a StoryTemplate.mdx file in the src/demo directory that provides a consistent template for Storybook documentation. This template includes:

- Title
- Subtitle
- Primary example
- Controls
- Additional stories

## Usage in Development

Storybook serves several purposes in the Page Constructor development workflow:

1. **Component Documentation**: Provides a visual reference for available components
2. **Visual Testing**: Allows testing components in isolation
3. **Development Environment**: Facilitates component development without needing the full application
4. **Example Usage**: Demonstrates how to use components with various props and configurations
