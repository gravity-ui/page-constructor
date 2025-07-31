# Divider Sub-block Usage

This document outlines the Divider sub-block in the page-constructor project.

## Overview

The Divider sub-block is a utility component that creates vertical spacing or horizontal lines between content elements. It provides consistent spacing options through predefined size values and can optionally display a horizontal border line. The Divider can be used to create visual separation between content sections, improving readability and visual hierarchy.

## Component Details

### Divider Sub-block

- **File**: `src/sub-blocks/Divider/Divider.tsx`
- **Description**: Creates vertical spacing or horizontal lines between content elements.
- **Props**:
  - `size`: DividerSize - '0', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl' (default is 'm')
  - `border`: boolean - Whether to show a horizontal line (default is false)

### DividerSize Type

- **Description**: Defines available sizes for the Divider component.
- **Values**:
  - `'0'`: No spacing
  - `'xxs'`: Extra extra small spacing
  - `'xs'`: Extra small spacing
  - `'s'`: Small spacing
  - `'m'`: Medium spacing (default)
  - `'l'`: Large spacing
  - `'xl'`: Extra large spacing
  - `'xxl'`: Extra extra large spacing
  - `'xxxl'`: Extra extra extra large spacing

## Implementation Details

The Divider component is implemented as a simple div element with BEM classes for styling:

```tsx
const b = block('divider-block');

const Divider = ({size = 'm', border}: DividerProps) => <div className={b({size, border})} />;
```

The CSS implementation uses padding-top for spacing and an optional border:

```scss
#{$block} {
  &_size {
    &_xxs {
      padding-top: $indentXXS;
    }
    &_xs {
      padding-top: $indentXS;
    }
    &_s {
      padding-top: $indentSM;
    }
    &_m {
      padding-top: $indentM;
    }
    &_l {
      padding-top: $indentL;
    }
    &_xl {
      padding-top: $indentXL;
    }
    &_xxl {
      padding-top: $indentXXL;
    }
  }
  &_size_xxxl {
    padding-top: $indentXXXL;
  }

  &_border {
    border-top: 1px solid var(--g-color-line-generic);
  }
}
```

## Size Variations

The Divider component provides a range of size options to create consistent spacing throughout the application:

### No Spacing (0)

- No vertical space is added
- Useful when only a border line is needed without additional spacing

### Extra Extra Small (xxs)

- Minimal spacing
- Useful for very tight layouts or when elements need to be close together

### Extra Small (xs)

- Slightly more spacing than xxs
- Good for compact layouts

### Small (s)

- Moderate small spacing
- Suitable for related content that should be visually grouped

### Medium (m) - Default

- Standard spacing
- The default option that works well for most content separation needs

### Large (l)

- More pronounced spacing
- Good for separating distinct content sections

### Extra Large (xl)

- Significant spacing
- Useful for major content section breaks

### Extra Extra Large (xxl)

- Very large spacing
- For major visual breaks between content areas

### Extra Extra Extra Large (xxxl)

- Maximum spacing
- For the most significant content divisions

## Border Option

The `border` prop adds a horizontal line to the divider:

- When `true`, adds a 1px solid line using the theme's generic line color
- The line appears at the top of the divider's space
- Useful for creating visual separation beyond just spacing

## Best Practices

1. **Consistent Spacing**: Use the same divider sizes consistently throughout your application for similar types of content separation.

2. **Semantic Usage**: Choose divider sizes based on the relationship between content sections:

   - Smaller sizes for related content
   - Larger sizes for distinct content sections

3. **Border Usage**: Use the border option when you need a visual line in addition to spacing, particularly for:

   - Section breaks
   - Content grouping
   - Visual hierarchy enhancement

4. **Responsive Considerations**: Be mindful of how divider spacing affects layouts on different screen sizes.

5. **Accessibility**: Dividers are presentational elements and should not replace proper semantic HTML structure.

## Example Usage

### Basic Divider with Default Size

```tsx
<Divider />
```

### Divider with Custom Size

```tsx
<Divider size="l" />
```

### Divider with Border

```tsx
<Divider border={true} />
```

### Divider with Both Custom Size and Border

```tsx
<Divider size="xl" border={true} />
```

### Between Content Sections

```tsx
<ContentSection />
<Divider size="l" border={true} />
<ContentSection />
```

## Storybook Documentation

The Divider sub-block includes Storybook stories demonstrating:

- Default divider (size 'm')
- All available size variations
- With and without border options

Stories are located in `src/sub-blocks/Divider/__stories__/Divider.stories.tsx` with example data in `data.json`.

## CSS Classes

The component uses BEM methodology for CSS classes:

- `.divider-block` - Main container
- `.divider-block_size_xxs` through `.divider-block_size_xxxl` - Size modifiers
- `.divider-block_border` - Border modifier
