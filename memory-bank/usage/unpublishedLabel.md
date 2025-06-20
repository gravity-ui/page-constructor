# UnpublishedLabel Component Usage

This document outlines the UnpublishedLabel component in the page-constructor project.

## Overview

The UnpublishedLabel component is a utility component that displays a label indicating that content is unpublished. It provides a visual indicator to users that the content they are viewing is not yet published or is in draft state. The component supports two display types (label and line) and includes internationalization support for English and Russian languages.

## Component Details

### UnpublishedLabel Component

- **File**: `src/components/UnpublishedLabel/UnpublishedLabel.tsx`
- **Description**: Displays a label indicating unpublished content with configurable display type and internationalization support.
- **Props**:
  - `type`: Display type - `'label'` or `'line'` (defaults to `'line'`)
  - `className`: Optional CSS class name for the container
  - `children`: Optional custom content to display instead of the default internationalized text

### LabeLType Type

- **Description**: Defines available display types for the UnpublishedLabel component.
- **Values**:
  - `'label'`: Compact label style with minimal padding
  - `'line'`: Full-width line style with more padding

### Internationalization Support

- **Files**:
  - `src/components/UnpublishedLabel/i18n/en.json`
  - `src/components/UnpublishedLabel/i18n/ru.json`
- **Default Text**:
  - English: "Unpublished"
  - Russian: "Не опубликовано"

## Usage Patterns

> **Note**: In the code examples below, `b()` is a utility function used throughout the page-constructor project for BEM (Block Element Modifier) class naming. It generates CSS class names following the BEM methodology, making the code more maintainable and consistent.

### Standalone Usage

The UnpublishedLabel component is designed as a standalone utility component that can be used to indicate unpublished content status:

```tsx
// Basic usage with default line type
<UnpublishedLabel />

// Label type for compact display
<UnpublishedLabel type="label" />

// With custom className
<UnpublishedLabel
  type="line"
  className="custom-unpublished-label"
/>

// With custom content
<UnpublishedLabel type="label">
  Draft Content
</UnpublishedLabel>
```

## Display Types

### Line Type (Default)

The line type displays the unpublished label as a full-width block:

- Uses `body-3` text size
- Has 15px padding on all sides
- Suitable for standalone display or as a banner

**CSS Classes Applied**:

- `.unpublished-label_type_line`
- Full padding and text styling

### Label Type

The label type displays the unpublished label as a compact label:

- Uses label styling mixin
- Minimal padding
- Suitable for inline display or as a small indicator

**CSS Classes Applied**:

- `.unpublished-label_type_label`
- Compact label styling

## Styling

The UnpublishedLabel component uses a consistent danger-themed background:

### Background Color

- Uses CSS custom property: `var(--g-color-base-danger-heavy)`
- Provides a red/danger background to clearly indicate unpublished status

### Typography

- **Line type**: Uses `body-3` text size with 15px padding
- **Label type**: Uses the `@include label()` mixin for consistent label styling

## Integration with Theme System

The UnpublishedLabel component integrates with the page-constructor theme system:

1. **CSS Custom Properties**: Uses theme-aware CSS custom properties for consistent coloring
2. **BEM Methodology**: Follows BEM naming conventions for maintainable CSS
3. **Typography System**: Uses the project's typography mixins for consistent text styling

## Best Practices

1. **Type Selection**:

   - Use `'line'` type for prominent unpublished indicators or banners
   - Use `'label'` type for compact inline indicators

2. **Content Customization**:

   - Rely on the default internationalized text for consistency
   - Use custom children only when specific messaging is required

3. **Accessibility**:

   - The component provides clear visual indication of unpublished status
   - The danger-themed background ensures high visibility

4. **Placement**:
   - Position the component prominently when content is unpublished
   - Consider using at the top of content areas for maximum visibility

## Example Usage

### Basic Unpublished Indicator

```tsx
<UnpublishedLabel />
```

### Compact Label Style

```tsx
<UnpublishedLabel type="label" />
```

### With Custom Styling

```tsx
<UnpublishedLabel type="line" className="my-custom-unpublished-style" />
```

### With Custom Content

```tsx
<UnpublishedLabel type="label">Preview Mode</UnpublishedLabel>
```

## Storybook Documentation

The UnpublishedLabel component includes Storybook stories demonstrating:

- Default line type display
- Label type variation
- Different configurations and styling options

Stories are located in `src/components/UnpublishedLabel/__stories__/UnpublishedLabel.stories.tsx` with example data in `data.json`.

## Potential Usage Scenarios

While not currently used by other components, the UnpublishedLabel component could be integrated into:

1. **Content Management**: Indicating draft or unpublished articles, pages, or blocks
2. **Editor Interface**: Showing content status in editing environments
3. **Preview Mode**: Indicating when content is being previewed before publication
4. **Admin Interfaces**: Marking content that requires review or approval

## Testing

The UnpublishedLabel component can be tested for:

- Default rendering with internationalized text
- Type variations (line vs label)
- Custom content display
- CSS class application
- Theme integration

Test files would typically be located in `src/components/UnpublishedLabel/__tests__/UnpublishedLabel.test.tsx`.
