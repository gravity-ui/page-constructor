# Text Size System Update

## Overview

This document details the recent update to the text sizing system in the Page Constructor library, specifically the enhancement of the `textSize` constant and related TypeScript types.

## Changes Made

### Constants Update

**File**: `src/schema/validators/common.ts`

**Previous Value**:

```typescript
export const textSize = ['s', 'm', 'l'];
```

**Updated Value**:

```typescript
export const textSize = ['xs', 's', 'sm', 'm', 'l'];
```

### TypeScript Type Update

**File**: `src/models/constructor-items/common.ts`

**Previous Type**:

```typescript
export type TextSize = 's' | 'm' | 'l';
```

**Updated Type**:

```typescript
export type TextSize = 'xs' | 's' | 'sm' | 'm' | 'l';
```

## New Size Options

### Added Sizes

1. **`'xs'` (Extra Small)**:

   - Smallest text size option
   - Provides finer control for very small text elements
   - Useful for captions, footnotes, or secondary information

2. **`'sm'` (Small-Medium)**:
   - Intermediate size between 's' and 'm'
   - Fills the gap in the sizing scale
   - Provides more granular typography control

### Existing Sizes (Unchanged)

- **`'s'` (Small)**: Standard small text size
- **`'m'` (Medium)**: Standard medium text size
- **`'l'` (Large)**: Standard large text size

## Impact Analysis

### Affected Components

The `textSize` property is used across multiple components:

1. **Link Components** (`LinkProps`):

   - Links now support the extended size range
   - Better typography control for navigation and inline links

2. **FileLink Components** (`FileLinkProps`):

   - File download links can use finer size control
   - Improved visual hierarchy for file listings

3. **Title Components** (`TitleProps`):

   - Titles support more granular sizing
   - Better heading hierarchy control

4. **Block Components**:
   - Various blocks that use text sizing inherit the new options
   - Slider blocks (`src/blocks/Slider/schema.ts`, `src/blocks/SliderOld/schema.ts`)
   - PriceDetailed block (`src/sub-blocks/PriceDetailed/schema.ts`)

### Schema Validation

All JSON schemas that reference `textSize` have been automatically updated to include the new values:

- Form validation now accepts `'xs'` and `'sm'` values
- Editor interfaces will show the new size options
- Runtime validation ensures type safety

## Benefits

### Enhanced Typography Control

1. **Finer Granularity**: More size options allow for better visual hierarchy
2. **Design Flexibility**: Designers have more tools for creating consistent typography scales
3. **Accessibility**: Better size options can improve readability for different user needs

### Backward Compatibility

- **No Breaking Changes**: Existing `'s'`, `'m'`, and `'l'` values continue to work
- **Gradual Adoption**: Teams can adopt new sizes incrementally
- **Default Behavior**: Components without explicit size settings remain unchanged

### Developer Experience

- **Type Safety**: TypeScript ensures only valid size values are used
- **IntelliSense**: IDEs will show all available size options
- **Validation**: JSON schema validation catches invalid size values

## Usage Examples

### Link with Extra Small Text

```json
{
  "text": "Terms and Conditions",
  "url": "/terms",
  "textSize": "xs"
}
```

### Title with Small-Medium Size

```json
{
  "text": "Section Subtitle",
  "textSize": "sm"
}
```

### FileLink with Fine-Tuned Sizing

```json
{
  "href": "/document.pdf",
  "text": "Download PDF",
  "textSize": "sm"
}
```

## Migration Guide

### For Existing Projects

No migration is required as this is a non-breaking change. Existing size values (`'s'`, `'m'`, `'l'`) continue to work as before.

### For New Development

Consider using the new size options where appropriate:

- Use `'xs'` for secondary information, captions, or legal text
- Use `'sm'` when you need a size between small and medium
- Continue using existing sizes for established design patterns

## Testing Considerations

### Visual Regression Testing

- Existing components should render identically
- New size options should be tested across different themes
- Responsive behavior should be verified for all sizes

### Schema Validation Testing

- Ensure new size values pass validation
- Verify that invalid size values are rejected
- Test editor interfaces with new options

## Future Considerations

### Potential Enhancements

1. **CSS Custom Properties**: Consider mapping sizes to CSS custom properties for easier theming
2. **Responsive Sizing**: Explore size variations across different screen sizes
3. **Semantic Naming**: Consider more semantic size names in future versions

### Deprecation Strategy

If size names need to change in the future, follow the established deprecation pattern:

1. Add new names while keeping old ones
2. Mark old names as deprecated in documentation
3. Remove deprecated names in next major version

## Related Documentation

- [System Patterns](systemPatterns.md) - Component architecture patterns
- [Tech Context](techContext.md) - Technical implementation details
- [Progress](progress.md) - Current project status and achievements
