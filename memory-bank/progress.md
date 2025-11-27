# Progress: Page Constructor

## Current Status

The Page Constructor library is a mature and stable project that provides a comprehensive solution for building web pages using a component-based approach. It is currently at version 7.6.2 and follows semantic versioning for releases.

## What Works

### Core Functionality

- **Block Rendering**: The core functionality of rendering blocks based on JSON data works reliably
- **Theming**: Support for light and dark themes with themed properties
- **Customization**: Ability to register custom blocks and extend functionality
- **Responsive Design**: Grid system for responsive layouts
- **Animation**: Animation support for blocks
- **Internationalization**: Support for multiple languages

### Block Library

The library includes a comprehensive set of blocks for various use cases:

- **Layout Blocks**: Header (with enhanced features), ContentLayout, CardLayout
- **Content Blocks**: Media, Banner, Info, Table, Tabs
- **Interactive Blocks**: Slider, Questions, FoldableList, Form
- **Feature Blocks**: PromoFeatures, ExtendedFeatures, Icons
- **Integration Blocks**: Map, Share, Companies

#### HeaderBlock Enhanced Features

The HeaderBlock has been significantly enhanced with new capabilities:

- **Media Customization**: `mediaView` and `mediaClassName` props for better media control
- **Layout Customization**: Multiple className props for fine-grained styling control:
  - `gridClassName` for Grid component styling
  - `contentWrapperClassName` for content wrapper styling
  - `contentInnerClassName` for content inner element styling
  - `mediaClassName` for media element styling
- **Props Evolution**: Renamed `containerFluidClassName` to `contentWrapperClassName` for better clarity

### Sub-block Components

Recently updated sub-block components with enhanced consistency:

- **BasicCard**: Simple card component with icon support, Gravity icons integration, and flexible control positioning
- **LayoutItem**: Layout component with media support and fullscreen capabilities
- **BackgroundCard**: Card with background image/color support and theme variations
- **ImageCard**: Image-focused card with directional layout options
- **Content**: Shared content component used across all card types for consistent rendering
- **ContentList**: Enhanced with Gravity icons support for list items
- **IconWrapper**: Updated to support both traditional image icons and Gravity UI icons

### Layout Blocks Enhancement

- **CardLayout Block**: Enhanced with title centering support:
  - **Title Centering Control**: New `centered?: boolean` prop allows centering title and subtitle
  - **Title Component**: Extended with `colJustifyContent` prop for alignment control
  - **Responsive Layout**: Dynamic column sizes adapt based on `centered` prop:
    - When `centered === false`: uses `sm: 8` for narrower left-aligned title column
    - When `centered === true`: uses `sm: 12` for full-width centered title
  - **Implementation**: Conditional logic `centered ? GridJustifyContent.Center : GridJustifyContent.Start` for alignment and `centered ? 12 : 8` for column size
  - **Backward Compatible**: Default `centered: false` maintains existing left-aligned behavior

### Icon System

Enhanced icon capabilities with Gravity UI integration:

- **Universal Icon Component**: New `Icon` component supporting both image and Gravity UI icons
- **Gravity Icons Integration**: Full integration with `@gravity-ui/icons` library
- **Color Theming**: Support for 'brand' and 'text-color' icon colors
- **Type Safety**: `GravityIconProps` type with proper validation
- **Backward Compatibility**: Existing image icons continue to work alongside new Gravity icons
- **Schema Validation**: JSON schema validation for Gravity icon configurations

### Text Sizing System

Enhanced text sizing capabilities:

- **TextSize Type**: Updated from `['s', 'm', 'l']` to `['xs', 's', 'sm', 'm', 'l']`
- **New Sizes**: Added `'xs'` (extra small) and `'sm'` (small-medium) for finer typography control
- **Affected Components**: Links, FileLink, Title, and various blocks now support extended size range
- **Schema Validation**: Updated JSON schemas to include new text size options

### Editor

- **Visual Editing**: WYSIWYG editor for creating and modifying pages
- **Code Editing**: Support for direct JSON/YAML editing
- **Form-based Editing**: User-friendly forms for configuring block properties
- **Real-time Preview**: Immediate visual feedback on changes
- **Block Templates**: Pre-defined templates for common block configurations

### Server Utilities

- **Content Transformation**: Tools for transforming YFM to HTML
- **Typography Enhancement**: Typograf integration for text formatting
- **HTML Sanitization**: Security measures for user-generated content

## What's Left to Build

### Planned Enhancements

1. **YAML Support**: Enhancing support for YAML format beyond the current JSON focus
2. **Mobile Optimization**: Improving mobile experience for both editor and rendered pages
3. **Performance Enhancements**: Further optimizing bundle size and rendering performance
4. **Accessibility Compliance**: Ensuring all components meet WCAG 2.1 AA standards
5. **Documentation Expansion**: Adding more examples and use cases

### Technical Debt

1. **Legacy Support**: Addressing deprecated props and components
2. **Bundle Size Optimization**: Reducing bundle size and improving tree-shaking
3. **Test Coverage**: Expanding test coverage for edge cases
4. **Code Refactoring**: Improving code organization and reducing duplication

## Known Issues

1. **Mobile Experience**: Some components need better mobile adaptation
2. **Bundle Size**: Large dependency tree impacts performance
3. **Documentation Gaps**: Some advanced features lack detailed documentation
4. **Browser Compatibility**: Limited support for older browsers

## Evolution of Project Decisions

### Architecture Decisions

1. **Component-based Approach**: The decision to use a component-based architecture has proven successful, allowing for flexibility and maintainability
2. **TypeScript Adoption**: The use of TypeScript has improved developer experience and reduced errors
3. **Context Providers**: The use of React context for configuration has simplified component implementation
4. **Schema Validation**: JSON Schema validation has ensured data integrity
5. **Icon System Evolution**: Migration from image-only icons to hybrid system supporting both images and Gravity UI icons provides better flexibility and consistency

### API Evolution

1. **Block API**: The block API has evolved to support more features while maintaining backward compatibility
2. **Theming Support**: Theming support has been enhanced to provide more flexibility
3. **Animation Control**: Animation settings have been refined for better performance and user experience
4. **Custom Block Integration**: The API for custom blocks has been improved for easier integration
5. **Icon API Enhancement**: Extended icon support from image-only to hybrid system with Gravity UI icons, maintaining backward compatibility

### Release Strategy

1. **Semantic Versioning**: The project follows semantic versioning for releases
2. **Alpha/Beta Releases**: Alpha and beta releases are used for testing new features
3. **Release Branches**: Separate branches are maintained for different major versions
4. **Automated Releases**: GitHub Actions automate the release process

## Next Milestones

1. **Version 7.0.0**: Major release with breaking changes and new features
2. **Enhanced YAML Support**: Better support for YAML format
3. **Mobile-First Approach**: Redesigning components with a mobile-first approach
4. **Performance Optimization**: Comprehensive performance improvements
5. **Accessibility Compliance**: Full WCAG 2.1 AA compliance
