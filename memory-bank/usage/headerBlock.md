# HeaderBlock Usage Documentation

## Overview

HeaderBlock is a versatile layout block that serves as the main header section of a page. It has been significantly enhanced with new content structure options, improved accessibility, and better responsive design integration.

## Enhanced Properties

### Content Structure

#### `overtitle`

- **Type**: `string | JSX.Element`
- **Description**: Text or JSX element displayed above the main title
- **Usage**: For category labels, breadcrumb-like navigation, or contextual information

```json
{
  "type": "header-block",
  "overtitle": "Product Category",
  "title": "Main Product Title"
}
```

#### `additionalInfo`

- **Type**: `string`
- **Description**: Additional information displayed after the description
- **Content Type**: YFM (Yandex Flavored Markdown)
- **Usage**: For supplementary details, disclaimers, or extended descriptions

```json
{
  "type": "header-block",
  "title": "Product Title",
  "description": "Main product description",
  "additionalInfo": "**Note**: Additional details about the product"
}
```

#### `status`

- **Type**: `JSX.Element`
- **Description**: Status element displayed next to the title
- **Usage**: For badges, labels, or status indicators

### Custom Rendering

#### `renderTitle`

- **Type**: `(title: string) => React.ReactNode`
- **Description**: Function for custom title rendering
- **Usage**: When you need custom title formatting or additional elements within the title

### Media Enhancements

#### `mediaView`

- **Type**: `'full' | 'fit'`
- **Default**: `'full'`
- **Description**: Controls how media content is displayed
- **Usage**:
  - `'full'`: Media fills the available space
  - `'fit'`: Media maintains aspect ratio within bounds

#### `mediaClassName`

- **Type**: `string`
- **Description**: Additional CSS class for media elements
- **Usage**: For custom styling of media content

#### `containerFluidClassName`

- **Type**: `string`
- **Description**: Additional CSS class for the container-fluid element
- **Usage**: For custom styling of the main container that wraps the header content

### Background Enhancements

#### `fullWidthMedia`

- **Type**: `boolean`
- **Description**: Allows media backgrounds to extend to full viewport width
- **Usage**: For immersive background experiences

```json
{
  "type": "header-block",
  "title": "Immersive Header",
  "background": {
    "image": "background.jpg",
    "fullWidthMedia": true
  }
}
```

## Technical Implementation

### Component Architecture

The HeaderBlock now uses a component composition pattern:

```
HeaderBlock
├── Background (for media backgrounds)
├── FullWidthBackground (for full-width backgrounds)
└── Content Structure
    ├── overtitle
    ├── title (with custom rendering support)
    ├── description
    ├── additionalInfo
    └── buttons
```

### Responsive Design

- **WindowWidth Integration**: Uses `useWindowWidth` hook for responsive behavior
- **Breakpoint Constants**: Leverages `BREAKPOINTS` constants for consistent responsive design
- **Mobile Adaptation**: Enhanced mobile experience with conditional media rendering

### Accessibility Features

- **Unique IDs**: Uses `useUniqId()` hook for proper ARIA labeling
- **ARIA Relationships**: Buttons are properly associated with titles using `aria-describedby`
- **Screen Reader Support**: Improved content structure for better screen reader navigation

### Background Components

#### Background Component

- Handles media backgrounds with video and image support
- Mobile-responsive media rendering
- Parallax support (disabled by default)

#### FullWidthBackground Component

- Renders full-width background colors
- Used when `fullWidth` or `fullWidthMedia` is enabled

## Usage Examples

### Basic Enhanced Header

```json
{
  "type": "header-block",
  "overtitle": "New Release",
  "title": "Product Launch 2024",
  "description": "Introducing our latest innovation",
  "additionalInfo": "Available in **limited quantities**",
  "buttons": [
    {
      "text": "Learn More",
      "url": "/product",
      "theme": "action"
    }
  ]
}
```

### Header with Full-Width Media Background

```json
{
  "type": "header-block",
  "title": "Immersive Experience",
  "description": "Full-width background showcase",
  "background": {
    "image": {
      "src": "hero-background.jpg",
      "alt": "Hero background"
    },
    "fullWidthMedia": true,
    "color": "#1a1a1a"
  },
  "theme": "dark"
}
```

### Header with Custom Media View

```json
{
  "type": "header-block",
  "title": "Product Showcase",
  "description": "Featured product display",
  "image": {
    "src": "product-image.jpg",
    "alt": "Product showcase"
  },
  "mediaView": "fit",
  "mediaClassName": "custom-media-style"
}
```

## Migration Notes

### New Properties

- All new properties are optional and backward compatible
- Existing HeaderBlock configurations will continue to work unchanged

### Enhanced Features

- Improved accessibility is automatically applied
- Responsive design enhancements are enabled by default
- Background rendering improvements are transparent to existing usage

### Deprecated Properties

- Some legacy properties may be deprecated in future versions
- Check the schema for current property status

## Best Practices

1. **Content Hierarchy**: Use `overtitle` for contextual information, `title` for main heading, `description` for primary details, and `additionalInfo` for supplementary content

2. **Accessibility**: Always provide meaningful `alt` text for images and ensure proper content structure

3. **Responsive Design**: Test headers across different screen sizes, especially when using custom media configurations

4. **Performance**: Use appropriate image sizes and formats for background media

5. **Theme Consistency**: Ensure theme settings work well with background colors and media content

## Schema Reference

The HeaderBlock schema includes all enhanced properties with proper validation:

- `overtitle`: String or JSX content type
- `additionalInfo`: YFM content with textarea input
- `mediaView`: Enum with 'full' and 'fit' options
- `fullWidthMedia`: Boolean for background configuration
- `renderTitle`: Function prop (not in schema, runtime only)
- `status`: JSX element (not in schema, runtime only)
- `mediaClassName`: String for custom styling
- `containerFluidClassName`: String for custom styling (not in schema, runtime only)
