# Card Component Updates

## Overview

This document details the recent updates made to the card components in the Page Constructor library: BasicCard, LayoutItem, BackgroundCard, and ImageCard.

## Updated Components

### 1. BasicCard (`src/sub-blocks/BasicCard/BasicCard.tsx`)

**Key Changes:**

- Added `controlPosition` prop with default value `'content'`
- Implemented `useUniqId()` for accessibility IDs (`titleId`, `descriptionId`)
- Added proper ARIA attributes (`aria-describedby`, `aria-labelledby`)
- Standardized size default to `'s'`
- Enhanced theme support with `getThemedValue` for icons
- Improved integration with `Content` sub-block

**Props Added/Modified:**

- `controlPosition = 'content'` - Controls where buttons/links are positioned
- `size = 's'` - Standardized default size
- Enhanced accessibility with proper ID management

### 2. LayoutItem (`src/sub-blocks/LayoutItem/LayoutItem.tsx`)

**Key Changes:**

- Added `controlPosition` prop with default value `'content'`
- Implemented `useUniqId()` for `titleId`
- Enhanced theme support for both icons and media
- Improved media handling with fullscreen capabilities
- Better integration with `Content` sub-block for consistent rendering

**Props Added/Modified:**

- `controlPosition = 'content'` - Controls positioning of content controls
- Enhanced media processing with theme support
- Improved accessibility with proper ID management

### 3. BackgroundCard (`src/sub-blocks/BackgroundCard/BackgroundCard.tsx`)

**Key Changes:**

- Added `controlPosition` prop with default value `'content'`
- Implemented `useUniqId()` for `titleId`
- Enhanced logic for control positioning based on `paddingBottom`
- Standardized size default to `'s'`
- Improved theme integration for background properties

**Props Added/Modified:**

- `controlPosition = 'content'` - Controls where buttons/links are positioned
- `size = 's'` - Standardized default size
- Enhanced background theme support

### 4. ImageCard (`src/sub-blocks/ImageCard/ImageCard.tsx`)

**Key Changes:**

- Added `controlPosition` prop with default value `'content'`
- Implemented `useUniqId()` for `titleId`
- Standardized size default to `'s'`
- Enhanced theme support for images
- Improved content detection logic

**Props Added/Modified:**

- `controlPosition = 'content'` - Controls positioning of content controls
- `size = 's'` - Standardized default size
- Enhanced image theme support

## Common Patterns Implemented

### 1. Control Positioning

All card components now support flexible control positioning:

```typescript
const areControlsInFooter = controlPosition === 'footer';

// In Content component usage:
controlPosition={areControlsInFooter ? 'bottom' : 'default'}
```

### 2. Accessibility Enhancement

Consistent accessibility pattern across all cards:

```typescript
const titleId = useUniqId();
const descriptionId = useUniqId(); // where applicable

// Usage in components:
<Content titleId={titleId} />
// And proper ARIA attributes in card wrappers
```

### 3. Theme Integration

Standardized theme support:

```typescript
const theme = useTheme();
const themedIcon = getThemedValue(icon, theme);
const themedMedia = getThemedValue(media, theme);
```

### 4. Size Standardization

All components now default to size `'s'`:

```typescript
size = 's';
```

## Content Sub-block Integration

All card components now consistently use the `Content` sub-block with:

- Proper `titleId` passing for accessibility
- Consistent `controlPosition` mapping
- Standardized `colSizes` configuration
- Theme support where applicable

## Benefits of Updates

1. **Consistency**: All card components now follow the same patterns and conventions
2. **Accessibility**: Enhanced ARIA support and proper ID management
3. **Flexibility**: Control positioning allows for better layout control
4. **Maintainability**: Shared patterns make the codebase easier to maintain
5. **Theme Support**: Improved theme integration across all card types

## Migration Notes

These updates are backward compatible. The new props have sensible defaults:

- `controlPosition` defaults to `'content'` (existing behavior)
- `size` defaults to `'s'` (consistent with library standards)
- Accessibility improvements are automatic and don't require changes to existing usage

## Testing

All updated components maintain their existing Storybook stories and visual tests, ensuring no regression in functionality while adding the new capabilities.
