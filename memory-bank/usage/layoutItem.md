# LayoutItem Sub-block Usage

This document outlines how the LayoutItem sub-block is used in the page-constructor project.

## Overview

The LayoutItem sub-block is a versatile component that combines media content with text content in a structured layout. It provides a flexible way to display content with media (images, videos), metadata, icons, and various control elements like links and buttons. The component supports fullscreen media viewing, themed icons, and different control positioning options.

## Component Details

### LayoutItem Sub-block

- **File**: `src/sub-blocks/LayoutItem/LayoutItem.tsx`
- **Description**: Displays content with media, metadata, and optional controls like links and buttons.
- **Props**:
  - `content`: Content block properties including title, text, links, buttons, etc.
  - `contentMargin`: Margin around the content ('s', 'm', 'l', 'xl')
  - `media`: Media properties with theme support
  - `metaInfo`: Array of metadata strings
  - `border`: Boolean to enable/disable border around media
  - `fullscreen`: Boolean to enable/disable fullscreen media viewing
  - `icon`: Icon with theme support and position
  - `className`: Optional CSS class name
  - `analyticsEvents`: Analytics events to track
  - `controlPosition`: Position of controls (links and buttons) - 'content' or 'footer'

## Usage Patterns

> **Note**: In the code examples below, `b()` is a utility function used throughout the page-constructor project for BEM (Block Element Modifier) class naming. It generates CSS class names following the BEM methodology, making the code more maintainable and consistent.

The LayoutItem sub-block is primarily used as a standalone component that can be included in various blocks through the JSON configuration. While it's not directly imported and used by other components in the codebase, it can be used in the following ways:

### In JSON Configuration

The LayoutItem can be included in a page's JSON configuration:

```json
{
  "blocks": [
    {
      "type": "card-layout",
      "title": "Card Layout with Layout Items",
      "children": [
        {
          "type": "layout-item",
          "content": {
            "title": "Layout Item Title",
            "text": "Layout item description text",
            "buttons": [
              {
                "text": "Button",
                "theme": "action",
                "url": "https://example.com"
              }
            ]
          },
          "media": {
            "light": {"image": "/path/to/image-light.png"},
            "dark": {"image": "/path/to/image-dark.png"}
          }
        }
      ]
    }
  ]
}
```

### In FilterBlock

The LayoutItem can be used as a card type in the FilterBlock:

```json
{
  "type": "filter-block",
  "title": "Filter Block with Layout Items",
  "tags": [
    {"id": "tag1", "label": "Tag 1"},
    {"id": "tag2", "label": "Tag 2"}
  ],
  "items": [
    {
      "tags": ["tag1"],
      "card": {
        "type": "layout-item",
        "content": {
          "title": "Layout Item 1",
          "text": "Description text for layout item 1"
        },
        "media": {
          "light": {"image": "/path/to/image-light.png"},
          "dark": {"image": "/path/to/image-dark.png"}
        }
      }
    }
  ]
}
```

## Component Structure

The LayoutItem component is composed of several key parts:

1. **Media**: Renders the media content (image, video, etc.) with optional fullscreen support
2. **MetaInfo**: Displays metadata information above the content
3. **Content**: Displays the main content including title, text, links, buttons, etc.
4. **IconWrapper**: Renders the icon with theme support and positioning

### Internal Structure

```tsx
<div className={b(null, className)}>
  {renderMedia()}
  {metaInfo && <MetaInfo items={metaInfo} className={b('meta-info')} />}
  <div className={b('content', {'no-media': !media, margin: contentMargin})}>
    <IconWrapper icon={themedIcon} className={b('wrapper')}>
      <Content {...contentProps} titleId={titleId} />
    </IconWrapper>
  </div>
</div>
```

## Media Handling

The component supports various media types:

### Image

```tsx
media: {
  light: { image: "/path/to/image-light.png" },
  dark: { image: "/path/to/image-dark.png" }
}
```

### YouTube Video

```tsx
media: {
  light: {
    youtube: "https://youtu.be/videoId",
    previewImg: "/path/to/preview-light.png"
  },
  dark: {
    youtube: "https://youtu.be/videoId",
    previewImg: "/path/to/preview-dark.png"
  }
}
```

## Fullscreen Support

The component can display media in fullscreen mode when the `fullscreen` prop is set to `true`. This is particularly useful for images and videos that benefit from a larger viewing area.

```tsx
<LayoutItem
  content={{
    title: 'Media with Fullscreen',
    text: 'Click on the media to view in fullscreen',
  }}
  media={{light: {image: '/path/to/image.png'}}}
  fullscreen={true}
/>
```

## Icon Support

The component supports icons with positioning:

### Icon with Top Position

```tsx
icon: {
  light: {
    value: "/path/to/icon-light.svg",
    position: "top"
  },
  dark: {
    value: "/path/to/icon-dark.svg",
    position: "top"
  }
}
```

### Icon with Left Position

```tsx
icon: {
  light: {
    value: "/path/to/icon-light.svg",
    position: "left"
  },
  dark: {
    value: "/path/to/icon-dark.svg",
    position: "left"
  }
}
```

## Control Position

The component supports two positions for controls (links and buttons):

- `content`: Controls are placed within the content area (default)
- `footer`: Controls are placed at the bottom of the layout item

## Integration with Theme System

The LayoutItem component integrates with the page-constructor theme system:

1. **Theme Processing**: Uses `getThemedValue()` utility to resolve themed media and icons
2. **Icon Processing**: Uses `IconWrapper` component to handle icon display and positioning
3. **Content Theming**: Passes theme to the Content component for consistent styling
4. **Theme Context**: Respects the global theme context for consistent styling

## Best Practices

1. **Content Structure**: Provide meaningful titles and descriptions for accessibility.

2. **Media Selection**:

   - Choose appropriate media that represents the content
   - Use themed media for consistent appearance in light and dark modes

3. **Icon Usage**:

   - Choose appropriate icons that represent the content
   - Use SVG icons for better scaling and theme support

4. **Control Position**:

   - Use `content` position for standard layout (default)
   - Use `footer` position for layout items where controls should be aligned at the bottom

5. **Metadata Display**:
   - Use metaInfo for displaying additional information like dates, categories, or tags
   - Keep metadata concise and relevant to the content

## Example Usage

### Basic LayoutItem

```tsx
<LayoutItem
  content={{
    title: 'Layout Item Title',
    text: 'Layout item description text',
  }}
  media={{
    light: {image: '/path/to/image-light.png'},
    dark: {image: '/path/to/image-dark.png'},
  }}
/>
```

### With MetaInfo

```tsx
<LayoutItem
  content={{
    title: 'Layout Item Title',
    text: 'Layout item description text',
  }}
  media={{
    light: {image: '/path/to/image-light.png'},
    dark: {image: '/path/to/image-dark.png'},
  }}
  metaInfo={['Category', 'Date: 2023-01-01']}
/>
```

### With YouTube Video

```tsx
<LayoutItem
  content={{
    title: 'Video Layout Item',
    text: 'Layout item with YouTube video',
  }}
  media={{
    light: {
      youtube: 'https://youtu.be/videoId',
      previewImg: '/path/to/preview-light.png',
    },
    dark: {
      youtube: 'https://youtu.be/videoId',
      previewImg: '/path/to/preview-dark.png',
    },
  }}
  fullscreen={true}
/>
```

### With Icon

```tsx
<LayoutItem
  content={{
    title: 'Layout Item with Icon',
    text: 'Layout item description text',
  }}
  icon={{
    light: {
      value: '/path/to/icon-light.svg',
      position: 'top',
    },
    dark: {
      value: '/path/to/icon-dark.svg',
      position: 'top',
    },
  }}
/>
```

### With Content List

```tsx
<LayoutItem
  content={{
    title: 'Layout Item with Content List',
    text: 'Layout item description text',
    list: [
      {
        icon: {
          light: '/path/to/icon-light.svg',
          dark: '/path/to/icon-dark.svg',
        },
        title: 'List Item 1',
        text: 'Description for list item 1',
      },
      {
        icon: {
          light: '/path/to/icon-light.svg',
          dark: '/path/to/icon-dark.svg',
        },
        title: 'List Item 2',
        text: 'Description for list item 2',
      },
    ],
  }}
/>
```

### With Footer Controls

```tsx
<LayoutItem
  content={{
    title: 'Layout Item with Footer Controls',
    text: 'Layout item description text',
    buttons: [
      {
        text: 'Button 1',
        theme: 'action',
        url: 'https://example.com',
      },
      {
        text: 'Button 2',
        theme: 'outlined',
        url: 'https://example.com',
      },
    ],
  }}
  controlPosition="footer"
/>
```

## Storybook Documentation

The LayoutItem component includes Storybook stories demonstrating:

- Default layout item display
- Layout item with content list
- Layout item with fullscreen media
- Layout item with metadata
- Layout item with YouTube video
- Layout item with icon (top and left positions)
- Layout item with different control positions (content and footer)

Stories are located in `src/sub-blocks/LayoutItem/__stories__/LayoutItem.stories.tsx` with example data in `data.json`.
