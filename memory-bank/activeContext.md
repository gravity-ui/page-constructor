# Active Context: Page Constructor

## Current Focus

The Page Constructor library is currently focused on providing a comprehensive solution for building web pages using a component-based approach. The library consists of several key parts:

1. **Core Library**: The main React components for rendering pages based on JSON data
2. **Editor**: A visual interface for creating and editing pages
3. **Widget**: An embeddable component for previewing pages
4. **Server Utilities**: Tools for transforming content on the server side

## Recent Changes

Recent development has focused on:

1. **Gravity Icons Integration** (Commits a72c3f3 and 8a8aa02):

   - **New Icon Component**: Created universal component `src/components/Icon/Icon.tsx` for working with icons
   - **Gravity UI Icons Support**: Integration with `@gravity-ui/icons` library for using ready-made icons
   - **New GravityIconProps Type**: Added type for gravity icons configuration with color support ('brand' | 'text-color')
   - **BasicCard Update**: Added support for `gravityIcon` prop in BasicCard component
   - **ContentList Update**: Added support for gravity icons in content lists
   - **IconWrapper Update**: Extended support for gravity icons in IconWrapper component
   - **Schema Validation**: Added validation for GravityIconProps in BasicCard and Content schemas
   - **Storybook Examples**: Added new stories to demonstrate gravity icons

2. **Button Component Enhancement**: Added support for icons through the `img` prop

   - Support for Gravity UI icons (React components)
   - Support for custom SVG strings
   - Configurable icon positioning (left/right)
   - Configurable icon size

3. **HeaderBlock Enhancements**: Significant updates to HeaderBlock with new functionality:

   - **New Content Properties**: Added `additionalInfo`, `overtitle`, and `status` for richer content structure
   - **Custom Rendering**: Added `renderTitle` function prop for custom title rendering
   - **Enhanced Background Support**: New `fullWidthMedia` property for full-width media backgrounds
   - **Improved Media Control**: Added `mediaView` and `mediaClassName` for better media customization
   - **Layout Customization**: Added `contentWrapperClassName` for custom styling of the content-wrapper element
   - **Content Inner Customization**: Added `contentInnerClassName` for custom styling of the content-inner element
   - **Accessibility Improvements**: Enhanced ARIA support with `useUniqId()` and proper labeling
   - **Context Integration**: Better integration with `useWindowWidth` and responsive breakpoints
   - **Component Architecture**: Refactored background rendering into separate `Background` and `FullWidthBackground` components
   - **Props Refactoring**: Renamed `containerFluidClassName` to `contentWrapperClassName` for better clarity

4. **Text Size Enhancement**: Updated `textSize` constant in `src/schema/validators/common.ts`:

   - **Previous values**: `['s', 'm', 'l']`
   - **Current values**: `['xs', 's', 'sm', 'm', 'l']`
   - Added new smaller sizes: `'xs'` (extra small) and `'sm'` (small-medium)
   - This affects all components that use text sizing: Links, FileLinkProps, TitleProps, and various blocks
   - Updated TypeScript type `TextSize` to include new values

5. **Card Component Standardization**: Updated BasicCard, LayoutItem, BackgroundCard, and ImageCard with consistent patterns:

   - Standardized `controlPosition` prop for flexible control placement ('content' vs 'footer')
   - Enhanced accessibility with `useUniqId()` for proper ARIA labeling
   - Consistent size defaults (size='s') across all card components
   - Unified theme support using `getThemedValue` utility
   - Improved integration with the Content sub-block

6. **Accessibility Improvements**: Enhanced ARIA attributes and ID management across card components
7. **Control Positioning**: New flexible control positioning system allowing buttons/links in footer area
8. **Performance Optimization**: Reducing bundle size and improving rendering performance
9. **Documentation**: Expanding Storybook examples and documentation

10. **Hover Background Color Enhancement**: Added support for customizable hover background colors in BasicCard component:

    - **Schema Support**: Added `hoverBackgroundColor` property to BasicCard schema as optional string field (**deprecated**)
    - **Component Implementation**: BasicCard component now accepts `hoverBackgroundColor` prop and applies it as CSS custom property `--hover-background-color` (**deprecated**)
    - **CSS Integration**: Uses existing `background-hover()` mixin in CardBase component that applies the custom property on hover
    - **Flexible Styling**: Allows any valid CSS color value (hex, rgb, rgba, named colors, etc.)
    - **Backward Compatibility**: Optional property that doesn't affect existing implementations

11. **CardLayout Title Centering Enhancement**: Added title centering support for CardLayout block:

    - **New Prop**: Added `centered?: boolean` prop to `CardLayoutBlockProps` for centering title and subtitle
    - **Default Behavior**: Default value is `false`, maintaining backward compatibility (left-aligned by default)
    - **Title Component Enhancement**: Extended `Title` component with `colJustifyContent?: GridJustifyContent` prop for controlling title and subtitle alignment
    - **Responsive Behavior**: Dynamic `colSizes` based on `centered` prop:
      - When `centered === false`: `sm: 8` (allows left-aligned title with narrower column)
      - When `centered === true`: `sm: 12` (full width for centered title)
    - **Implementation Logic**: Uses conditional check `centered ? GridJustifyContent.Center : GridJustifyContent.Start` for alignment and `centered ? 12 : 8` for column size
    - **No Breaking Changes**: All changes are backward compatible with default `centered: false` value

## Active Decisions and Considerations

### Architecture

- **Component Structure**: The library follows a hierarchical component structure with blocks, sub-blocks, and base components
- **Context Providers**: Multiple context providers manage different aspects of the application (theme, mobile detection, analytics, etc.)
- **Type System**: A comprehensive TypeScript type system ensures type safety and developer experience
- **Responsive Design**: Enhanced integration with window width context and breakpoint constants for better mobile adaptation
- **Component Composition**: Complex blocks like HeaderBlock use internal component composition (Background, FullWidthBackground) for better maintainability

### Block System

- **Block Types**: Each block has a specific type and set of properties
- **Schema Validation**: JSON Schema validation ensures data integrity
- **Theming**: Blocks support light and dark themes with themed properties
- **Animation**: Blocks can be animated with configurable settings

### Editor Experience

- **Real-time Preview**: Changes in the editor are immediately reflected in the preview
- **Code Editing**: Support for direct JSON/YAML editing
- **Form-based Editing**: User-friendly forms for configuring block properties
- **Block Templates**: Pre-defined templates for common block configurations

### Integration Patterns

- **Custom Blocks**: Applications can register custom blocks
- **Server Transformation**: Content can be transformed on the server side
- **Analytics Integration**: Hooks for tracking user interactions
- **Internationalization**: Support for multiple languages

## Next Steps

The following areas are being considered for future development:

1. **Component Standardization**: Apply the card component patterns to other sub-blocks and components
2. **YAML Support**: Enhancing support for YAML format
3. **Mobile Optimization**: Improving mobile experience for both editor and rendered pages
4. **Performance Enhancements**: Further optimizing bundle size and rendering performance
5. **Accessibility Compliance**: Continue expanding accessibility improvements to all components
6. **Documentation Expansion**: Update documentation to reflect new card component patterns

## Important Patterns and Preferences

### Code Organization

- **Component Structure**: Each block is in its own directory with component, styles, schema, and tests
- **Type Definitions**: Comprehensive TypeScript types for all components and data structures
- **Context Usage**: React context for sharing configuration and state
- **Styling Approach**: SCSS with BEM methodology for styling

### Development Workflow

- **Testing**: Unit tests with Jest and end-to-end tests with Playwright
- **Documentation**: Storybook for component documentation and examples
- **Release Process**: Semantic versioning with automated releases
- **Code Quality**: ESLint, Stylelint, and Prettier for code quality and formatting

## Learnings and Project Insights

### Successful Patterns

1. **Component-based Architecture**: The component-based approach has proven flexible and maintainable
2. **TypeScript Integration**: Strong typing has improved developer experience and reduced errors
3. **Context Providers**: Using context providers for configuration has simplified component implementation
4. **Schema Validation**: JSON Schema validation has ensured data integrity
5. **Card Component Standardization**: Recent updates to BasicCard, LayoutItem, BackgroundCard, and ImageCard demonstrate the value of consistent patterns across similar components

### Recent Achievements

1. **HeaderBlock Enhancement**: Significant improvements to HeaderBlock functionality:

   - Improved media control with `mediaClassName` props
   - Added layout customization with `contentWrapperClassName` prop

2. **Accessibility Enhancement**: Improved ARIA support across components with proper ID management
3. **Control Positioning Flexibility**: New `controlPosition` prop provides better layout control
4. **Theme Integration**: Consistent theme support using `getThemedValue` utility
5. **Component Consistency**: Standardized patterns across card components improve maintainability

### Documentation Updates

- Created detailed documentation of card component updates in [`cardComponentUpdates.md`](cardComponentUpdates.md)
- Created comprehensive documentation of Gravity Icons integration in [`gravityIconsIntegration.md`](gravityIconsIntegration.md)
- Updated system patterns to reflect new card architecture and icon system
- Enhanced progress tracking to include sub-block component improvements and icon system enhancements

### Challenges

1. **Bundle Size**: Managing bundle size with many dependencies
2. **Mobile Experience**: Ensuring consistent experience across devices
3. **Backward Compatibility**: Maintaining compatibility while evolving the API
4. **Documentation**: Keeping documentation up-to-date with new features

### Key Insights

1. **Flexibility vs. Simplicity**: Balancing flexibility for developers with simplicity for content creators
2. **Performance Considerations**: Optimizing performance for large pages with many blocks
3. **Integration Challenges**: Addressing challenges when integrating with different applications
4. **User Experience**: Focusing on both developer and end-user experience
5. **Icon Integration**: Successfully extended Button component to support both Gravity UI icons and custom SVG strings while maintaining backward compatibility
