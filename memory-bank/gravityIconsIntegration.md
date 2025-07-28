# Gravity Icons Integration

## Overview

Commits a72c3f3 and 8a8aa02 added full support for Gravity UI Icons in Page Constructor, creating a hybrid icon system that supports both traditional images and vector icons from the @gravity-ui/icons library.

## Key Changes

### New Components

#### Icon Component (`src/components/Icon/Icon.tsx`)

Universal component for working with icons:

```typescript
type Props = {
  gravityIcon?: GravityIconProps;
  icon?: ImageProps;
  className?: string;
} & Pick<ImageComponentProps, 'containerClassName'> &
  QAProps;
```

**Functionality:**

- Support for Gravity UI icons via `gravityIcon` prop
- Support for traditional images via `icon` prop
- Automatic icon type detection
- Integration with theming through CSS variables

#### Icon Styles (`src/components/Icon/Icon.scss`)

Styles for icon color theming:

```scss
&_color {
  &_brand {
    color: var(--g-color-base-brand) !important;
  }
  &_text-color {
    // as in nearest text
  }
}
```

### Type System Updates

#### GravityIconProps Type

New type in `src/models/constructor-items/common.ts`:

```typescript
export type GravityIconProps =
  | string
  | {
      name: keyof typeof icons;
      color: 'brand' | 'text-color';
    };
```

**Supported formats:**

- String: `"ChartColumn"` (uses 'brand' color by default)
- Object: `{name: "ChartColumn", color: "text-color"}` (with color configuration)

### Component Updates

#### BasicCard Enhancement

Added support for `gravityIcon` prop:

```typescript
interface BasicCardProps {
  // ... existing props
  gravityIcon?: ThemeSupporting<GravityIconProps>;
}
```

**Integration with IconWrapper:**

```typescript
<IconWrapper
    icon={themedIcon ? {value: themedIcon, position: iconPosition} : undefined}
    gravityIcon={
        themedGravityIcon
            ? {value: themedGravityIcon, position: iconPosition}
            : undefined
    }
    className={b('wrapper')}
    size={size}
>
```

#### ContentList Enhancement

Updated to support Gravity icons in list items:

```typescript
interface ContentItemProps {
  title?: string;
  text?: string;
  icon?: ThemeSupporting<ImageProps | SVGIcon>;
  gravityIcon?: ThemeSupporting<GravityIconProps>;
}
```

**ContentListItemIcon updated:**

- Support for both `icon` and `gravityIcon` props
- Priority given to `gravityIcon` if both are present
- Uses new universal `Icon` component

#### IconWrapper Enhancement

Extended support for Gravity icons:

```typescript
interface IconWrapperProps {
  icon?: PositionedIcon;
  gravityIcon?: PositionedGravityIcon;
  size?: 's' | 'm' | 'l';
}
```

**New interface:**

```typescript
interface PositionedGravityIcon {
  value: GravityIconProps;
  position?: IconPosition;
}
```

### Schema Validation

#### Common Validators (`src/schema/validators/common.ts`)

Added validation for GravityIconProps:

```typescript
export const GravityIconProps = {
  oneOf: [
    {
      type: 'string',
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
        color: {
          type: 'string',
          enum: ['brand', 'text-color'],
        },
      },
    },
  ],
};
```

#### BasicCard Schema (`src/sub-blocks/BasicCard/schema.ts`)

Added support for `gravityIcon` in schema:

```typescript
export const BasicCard = {
  // ... existing properties
  properties: {
    // ... existing properties
    gravityIcon: GravityIconProps,
  },
};
```

#### Content Schema (`src/sub-blocks/Content/schema.ts`)

Added support in Content elements:

```typescript
export const ContentItem = {
  properties: {
    // ... existing properties
    gravityIcon: withTheme(GravityIconProps),
  },
};
```

### Storybook Integration

#### BasicCard Stories

Added new `GravityIcons` story with examples:

```json
"gravityIcons": [
    {
        "text": "Icon in content list",
        "list": [
            {
                "gravityIcon": "ChartColumn",
                "title": "Brand icon color",
                "text": "Nisi ut aliquip ex ea commodo consequat."
            },
            {
                "gravityIcon": {
                    "name": "ChartColumn",
                    "color": "text-color"
                },
                "title": "Text icon color",
                "text": "Nisi ut aliquip ex ea commodo consequat."
            }
        ]
    }
]
```

## Technical Implementation

### Icon Resolution Logic

1. **Gravity Icon Priority**: If `gravityIcon` is present, it is used
2. **Fallback to Image**: If `gravityIcon` is absent, `icon` is used
3. **Color Application**: Color is applied through CSS classes and variables
4. **Theme Integration**: Support for `getThemedValue` for theming

### CSS Integration

Icons are integrated with Gravity UI CSS variable system:

- `--g-color-base-brand` for brand color
- Text color inheritance for `text-color`

### Backward Compatibility

- All existing `icon` props continue to work
- New `gravityIcon` props are optional
- Components automatically detect icon type
- Validation schemas support both formats

## Usage Examples

### Simple String Format

```json
{
  "gravityIcon": "ChartColumn"
}
```

### Object Format with Color

```json
{
  "gravityIcon": {
    "name": "ChartColumn",
    "color": "text-color"
  }
}
```

### In BasicCard

```json
{
  "gravityIcon": "ChartColumn",
  "iconPosition": "left",
  "text": "Card with Gravity icon",
  "buttons": [
    {
      "text": "Action",
      "theme": "action",
      "url": "#"
    }
  ]
}
```

### In ContentList

```json
{
  "list": [
    {
      "gravityIcon": "ChartColumn",
      "title": "List item with icon",
      "text": "Description text"
    }
  ]
}
```

## Benefits

1. **Consistency**: Unified icon style through Gravity UI
2. **Performance**: Vector icons instead of raster images
3. **Theming**: Automatic color theme support
4. **Scalability**: Icons scale without quality loss
5. **Maintenance**: Centralized icon management through library
6. **Backward Compatibility**: Existing code continues to work

## Future Considerations

1. **Icon Library Expansion**: Ability to add custom icons
2. **Animation Support**: Support for animated icons
3. **Size Variants**: Additional icon sizes
4. **Accessibility**: Improved icon accessibility
5. **Performance Optimization**: Tree-shaking of unused icons
