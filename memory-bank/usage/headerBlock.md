# HeaderBlock Usage

This document outlines how the HeaderBlock is used and its recent enhancements in the page-constructor project.

## Overview

The HeaderBlock is a versatile block component that serves as a page header with support for titles, descriptions, media, backgrounds, and call-to-action buttons. It provides extensive customization options for layout, styling, and content presentation.

## Recent Enhancements

The HeaderBlock has been significantly enhanced with new functionality:

### Layout Customization Props

The HeaderBlock now supports multiple className props for fine-grained styling control:

- **`gridClassName`**: Custom styling for the Grid component
- **`contentWrapperClassName`**: Custom styling for the content wrapper element
- **`contentInnerClassName`**: Custom styling for the content inner element
- **`mediaClassName`**: Custom styling for media elements

### Props Evolution

- **Props Refactoring**: Renamed `containerFluidClassName` to `contentWrapperClassName` for better semantic clarity
- **Props Added/Modified**: Added option to use `videoIframe` to embed iframe-based video content as media

### Enhanced Content Structure

- **`overtitle`**: Content displayed above the main title
- **`additionalInfo`**: Additional information displayed after the description
- **`status`**: Status element support within the title area
- **`renderTitle`**: Custom function for rendering the title

### Background and Media Features

- **`fullWidthMedia`**: Support for full-width media backgrounds
- **`videoIframe`**: Support for embedding iframe-based video content as media
- **`mediaView`**: Control over media display mode ('full' by default)
- **Component Composition**: Separate `Background` and `FullWidthBackground` components for better maintainability

## Component Architecture

```tsx
type ElementsClassName = {
  gridClassName?: string;
  mediaClassName?: string;
  contentWrapperClassName?: string;
  contentInnerClassName?: string;
};

export type HeaderBlockFullProps = HeaderBlockProps & ClassNameProps & ElementsClassName;
```

### Internal Structure

The HeaderBlock uses a sophisticated layout structure:

```tsx
<header className={b({...})}>
    {/* Full width background */}
    {backgroundThemed && fullWidth && <FullWidthBackground background={backgroundThemed} />}

    {/* Media background */}
    {backgroundThemed && <Background background={backgroundThemed} isMobile={isMobile} />}

    <Grid containerClass={b('container-fluid')} className={b(null, gridClassName)}>
        {/* Breadcrumbs */}
        {breadcrumbs && (
            <Row className={b('breadcrumbs')}>
                <Col>
                    <HeaderBreadcrumbs {...breadcrumbs} theme={textTheme} />
                </Col>
            </Row>
        )}

        <Row>
            <Col reset className={b('content-wrapper', contentWrapperClassName)}>
                <Row>
                    <Col className={b('content', {...})}>
                        <Col
                            sizes={titleSizes}
                            className={b('content-inner', {centered}, contentInnerClassName)}
                        >
                            {/* Content: overtitle, title, description, additionalInfo, buttons */}
                        </Col>
                    </Col>
                </Row>

                {/* Right-side media */}
                {hasRightSideImage && (
                    <Media className={b('media', {[curImageSize]: true}, mediaClassName)} />
                )}
            </Col>
        </Row>
    </Grid>
</header>
```

## Key Features

### Responsive Design Integration

- **`useWindowWidth()`**: Hook for responsive behavior
- **`BREAKPOINTS`**: Constants for consistent breakpoint handling
- **Mobile Detection**: Automatic mobile detection for media rendering

### Accessibility

- **`useUniqId()`**: Generates unique IDs for accessibility
- **ARIA Labeling**: Proper ARIA attributes for buttons with `titleId`
- **Semantic HTML**: Uses proper `<header>` element

### Theme Support

- **`getThemedValue()`**: Utility for theme-aware properties
- **Theme Context**: Integration with the global theme system
- **Themed Properties**: Support for light/dark theme variations

## Usage Examples

### Basic HeaderBlock

```tsx
<HeaderBlock
  title="Welcome to Our Platform"
  description="Build amazing web experiences with our component library"
  buttons={[
    {
      text: 'Get Started',
      theme: 'action',
      url: '/getting-started',
    },
  ]}
/>
```

### With Custom Layout Styling

```tsx
<HeaderBlock
  title="Custom Styled Header"
  description="This header uses custom styling for different elements"
  gridClassName="custom-grid"
  contentWrapperClassName="custom-wrapper"
  contentInnerClassName="custom-inner"
  mediaClassName="custom-media"
  image="/path/to/image.jpg"
/>
```

### With Enhanced Content

```tsx
<HeaderBlock
  overtitle="New Feature"
  title="Advanced HeaderBlock"
  description="Enhanced with additional content options"
  additionalInfo="Learn more about our latest updates"
  status={<Badge>Beta</Badge>}
  renderTitle={(title) => <CustomTitleComponent title={title} />}
/>
```

### With Iframe Video

```tsx
<HeaderBlock
  title="Video Header"
  description="Header with iframe video"
  videoIframe={{
    src: 'https://example.com/video-iframe',
  }}
/>
```

### With Full-Width Background

```tsx
<HeaderBlock
  title="Full Width Experience"
  description="Header with full-width media background"
  background={{
    fullWidthMedia: true,
    image: '/path/to/background.jpg',
    color: '#f0f0f0',
  }}
/>
```

### With Media and Custom View

```tsx
<HeaderBlock
  title="Media Header"
  description="Header with right-side media"
  image="/path/to/image.jpg"
  mediaView="full"
  mediaClassName="custom-media-style"
/>
```

## Background Components

### Background Component

Handles media backgrounds with responsive behavior:

```tsx
const Background = ({background, isMobile}: BackgroundProps) => {
  const {url, image, fullWidthMedia, video, color} = background;
  const imageObject = url ? getMediaImage(url) : image;
  const renderMedia = !isMobile || (typeof image === 'object' && 'mobile' in image);

  return (
    <div
      className={b('background', {media: true, 'full-width-media': fullWidthMedia})}
      style={{backgroundColor: color}}
    >
      {renderMedia && (
        <Media
          {...background}
          className={b('background-media')}
          isBackground={true}
          parallax={false}
          video={isMobile ? undefined : video}
          image={imageObject}
        />
      )}
    </div>
  );
};
```

### FullWidthBackground Component

Handles full-width background colors:

```tsx
const FullWidthBackground = ({background}: FullWidthBackgroundProps) => (
  <div
    className={b('background', {['full-width']: true})}
    style={{backgroundColor: background?.color}}
  />
);
```

## Integration Patterns

### With Breadcrumbs

```tsx
<HeaderBlock
  title="Page with Navigation"
  breadcrumbs={{
    items: [{text: 'Home', url: '/'}, {text: 'Products', url: '/products'}, {text: 'Current Page'}],
  }}
/>
```

### With Custom Buttons

```tsx
<HeaderBlock
  title="Action Header"
  buttons={[
    {
      text: 'Primary Action',
      theme: 'action',
      url: '/action',
      extraProps: {
        'data-analytics': 'header-cta',
      },
    },
    {
      text: 'Secondary Action',
      theme: 'outlined',
      url: '/secondary',
    },
  ]}
/>
```

## Best Practices

### Layout Customization

1. **Use Semantic Class Names**: When providing custom className props, use semantic names that describe the purpose
2. **Maintain Consistency**: Keep styling consistent with the overall design system
3. **Responsive Considerations**: Ensure custom styles work across different screen sizes

### Content Structure

1. **Hierarchy**: Use overtitle for context, title for main message, description for details
2. **Accessibility**: Ensure proper heading hierarchy and ARIA labeling
3. **Content Length**: Keep titles concise and descriptions informative but not overwhelming

### Media Usage

1. **Image Optimization**: Use appropriately sized and optimized images
2. **Theme Support**: Provide both light and dark theme variants when needed
3. **Mobile Adaptation**: Consider how media displays on mobile devices
4. **Video Iframe**: When using videoIframe, ensure the source URL is properly formatted and accessible

### Background Implementation

1. **Performance**: Use appropriate image formats and sizes for backgrounds
2. **Contrast**: Ensure sufficient contrast between background and text
3. **Fallbacks**: Provide fallback colors for when images fail to load

## Technical Implementation

### Type Safety

The HeaderBlock uses comprehensive TypeScript types:

```tsx
interface BackgroundProps {
  background: HeaderBlockBackground;
  isMobile: boolean;
}

interface FullWidthBackgroundProps {
  background: HeaderBlockBackground;
}

type ElementsClassName = {
  gridClassName?: string;
  mediaClassName?: string;
  contentWrapperClassName?: string;
  contentInnerClassName?: string;
};
```

### Context Integration

- **Theme Context**: `useTheme()` for theme-aware rendering
- **Window Width Context**: `useWindowWidth()` for responsive behavior
- **Breakpoints**: `BREAKPOINTS` constants for consistent responsive design

### Utility Functions

- **`getThemedValue()`**: Resolves themed properties
- **`getMediaImage()`**: Processes media URLs
- **`mergeVideoMicrodata()`**: Adds structured data for videos
- **`useUniqId()`**: Generates unique IDs for accessibility

This enhanced HeaderBlock provides a powerful and flexible foundation for creating compelling page headers with extensive customization options while maintaining accessibility and performance standards.
