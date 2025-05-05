# System Patterns: Page Constructor

## Architecture Overview

The Page Constructor follows a component-based architecture with clear separation of concerns:

```
┌────────────────────────────────────────────────────────────┐
│                     Page Constructor                       │
├─────────────┬─────────────┬────────────────┬───────────────┤
│   Blocks    │  Sub-blocks │     Editor     │    Server     │
├─────────────┼─────────────┼────────────────┼───────────────┤
│  Components │    Grid     │    Context     │     Utils     │
└─────────────┴─────────────┴────────────────┴───────────────┘
```

## Core Components

### PageConstructor

The main component that renders a page based on JSON data. It:

- Processes the input data
- Renders blocks in the specified order
- Handles theming and customization
- Manages navigation and layout

### PageConstructorProvider

A context provider that wraps the PageConstructor and provides:

- Theme configuration
- Mobile detection
- Localization
- Location (URL/routing)
- Analytics
- Maps configuration
- Server-side rendering settings
- Form handling

### Editor

A visual editor for creating and modifying page content with:

- Real-time preview
- Block selection and configuration
- Code editing mode
- Form-based property editing
- Theme switching

### Widget

An embeddable component that renders the PageConstructor in an iframe, used for:

- Preview in the editor
- Embedding in external applications
- Isolated rendering environment

## Design Patterns

### Component Composition

Blocks are composed of smaller components and sub-blocks:

```
┌───────────────────────────────┐
│           Block               │
├───────────────────────────────┤
│        AnimateBlock           │
├───────────────────────────────┤
│          Sub-blocks           │
├───────────────────────────────┤
│ Basic Components (Button, etc)│
└───────────────────────────────┘
```

### Context Providers

Multiple context providers manage different aspects of the application:

- **ThemeContext**: Manages light/dark theme
- **MobileContext**: Detects and provides mobile state
- **LocaleContext**: Manages internationalization
- **LocationContext**: Provides URL and routing information
- **AnalyticsContext**: Handles analytics events
- **MapsContext**: Configures map integration
- **FormsContext**: Manages form state and submission
- **SSRContext**: Handles server-side rendering configuration
- **AnimateContext**: Controls animation settings
- **InnerContext**: Provides internal configuration to blocks

### Type System

A comprehensive type system using TypeScript ensures:

- **Block Types**: Enum of available block types
- **Block Models**: Interface for each block's properties
- **Sub-block Types**: Enum of available sub-block types
- **Sub-block Models**: Interface for each sub-block's properties
- **Common Types**: Shared types across components

### Schema Validation

JSON Schema validation ensures data integrity:

- Each block has a schema definition
- Schemas validate required and optional properties
- Schemas support theming with `withTheme` wrapper
- Validation occurs in the editor and at runtime

## Key Implementation Paths

### Block Rendering

1. `PageConstructor` receives content with blocks array
2. Blocks are separated into header blocks and regular blocks
3. Each block is rendered through `ConstructorItem` component
4. Block type determines which component to render
5. Block properties are passed to the component

### Custom Block Integration

1. Developer creates custom block component
2. Block is registered in custom blocks configuration
3. Custom block types are added to available block types
4. Custom block component is added to item map
5. Custom block schema is added to validators

### Theming

1. Theme is set in `PageConstructorProvider`
2. Theme value is accessed via `useTheme` hook
3. Themed properties use `ThemeSupporting<T>` type
4. `getThemedValue` utility extracts correct value for current theme
5. CSS variables apply theme-specific styles

### Animation

1. Animation settings are provided via `AnimateContext`
2. Blocks opt-in to animation with `animated` property
3. `AnimateBlock` component handles animation rendering
4. Animation is disabled during server-side rendering

## Data Flow

### YAML Data Flow

```
┌─────────────┐     ┌────────────────┐     ┌─────────────┐     ┌───────────────┐
│  YAML Data  │────▶│Server Transform│────▶│  JSON Data  │────▶│PageConstructor│
└─────────────┘     └────────────────┘     └─────────────┘     └───────────────┘
                                                                   │
                                                                   │
                                                                   ▼
                                                            ┌─────────────┐
                                                            │   Blocks    │
                                                            └─────────────┘
```

### JSON Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌───────────────┐
│    Editor   │────▶│  JSON Data  │────▶│PageConstructor│
└─────────────┘     └─────────────┘     └───────────────┘
                                               │
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Blocks    │
                                        └─────────────┘
```

## Extension Points

1. **Custom Blocks**: Register new block types
2. **Custom Sub-blocks**: Register new sub-block types
3. **Custom Headers**: Register new header block types
4. **Loadable Blocks**: Create blocks that load data dynamically
5. **Block Decorators**: Wrap blocks with additional functionality
6. **Custom Navigation**: Provide custom navigation components
7. **Theme Customization**: Extend or modify theme variables
8. **Analytics Integration**: Hook into user interactions
