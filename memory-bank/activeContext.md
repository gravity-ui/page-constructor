# Active Context: Page Constructor

## Current Focus

The Page Constructor library is currently focused on providing a comprehensive solution for building web pages using a component-based approach. The library consists of several key parts:

1. **Core Library**: The main React components for rendering pages based on JSON data
2. **Editor**: A visual interface for creating and editing pages
3. **Widget**: An embeddable component for previewing pages
4. **Server Utilities**: Tools for transforming content on the server side

## Recent Changes

Recent development has focused on:

1. **Improved Block Components**: Enhancing existing blocks and adding new ones
2. **Editor Enhancements**: Making the editor more user-friendly and feature-rich
3. **Performance Optimization**: Reducing bundle size and improving rendering performance
4. **Accessibility Improvements**: Ensuring components meet accessibility standards
5. **Documentation**: Expanding Storybook examples and documentation

## Active Decisions and Considerations

### Architecture

- **Component Structure**: The library follows a hierarchical component structure with blocks, sub-blocks, and base components
- **Context Providers**: Multiple context providers manage different aspects of the application (theme, mobile detection, analytics, etc.)
- **Type System**: A comprehensive TypeScript type system ensures type safety and developer experience

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

1. **YAML Support**: Enhancing support for YAML format
2. **Mobile Optimization**: Improving mobile experience for both editor and rendered pages
3. **Performance Enhancements**: Further optimizing bundle size and rendering performance
4. **Accessibility Compliance**: Ensuring all components meet WCAG 2.1 AA standards
5. **Documentation Expansion**: Adding more examples and use cases

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
