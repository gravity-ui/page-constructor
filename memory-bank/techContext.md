# Technical Context: Page Constructor

## Technology Stack

### Core Technologies

- **React**: The library is built on React for component-based UI development
- **TypeScript**: Used for type safety and better developer experience
- **SCSS**: For styling with variables, mixins, and nesting
- **JSON Schema**: For validating block data structure

### Build Tools

- **Webpack**: For bundling the library and widget
- **Gulp**: For build process automation
- **Babel**: For JavaScript transpilation
- **ESLint/Stylelint**: For code quality and style enforcement
- **Jest**: For unit testing
- **Playwright**: For end-to-end testing

### Dependencies

#### Core Dependencies

- **@bem-react/classname**: For BEM-style class naming
- **@gravity-ui/uikit**: UI component library
- **@gravity-ui/components**: Additional UI components
- **@gravity-ui/dynamic-forms**: For form generation
- **@gravity-ui/i18n**: For internationalization
- **@diplodoc/transform**: For Yandex Flavored Markdown transformation
- **@react-spring/web**: For animations
- **ajv**: For JSON Schema validation
- **lodash**: For utility functions
- **react-player**: For video playback
- **react-slick**: For carousel/slider functionality
- **swiper**: For touch-enabled sliders
- **typograf**: For typography enhancements
- **sanitize-html**: For HTML sanitization

#### Development Dependencies

- **Storybook**: For component documentation and testing
- **Monaco Editor**: For code editing in the editor
- **React Final Form**: For form state management
- **Husky**: For Git hooks
- **Prettier**: For code formatting

## Development Environment

- **Node.js**: Runtime environment
- **npm**: Package manager
- **Git**: Version control
- **GitHub Actions**: CI/CD pipeline

## Architecture Components

### Client-Side

- **Blocks**: Reusable page components (Banner, Media, Table, etc.)
- **Sub-blocks**: Components used within blocks (Cards, Quotes, etc.)
- **Components**: Basic UI elements (Button, Link, Image, etc.)
- **Grid**: Responsive layout system
- **Context**: React context providers for various features (including WindowWidthContext for responsive design)
- **Utils**: Utility functions and helpers (including responsive breakpoint constants)

### Server-Side

- **Text Transform**: Utilities for converting YFM to HTML
- **Typograf**: Text formatting and typography enhancement
- **Validation**: Schema validation for block data

### Editor

- **Form Editor**: UI for editing block properties
- **Code Editor**: Monaco-based editor for JSON/YAML
- **Preview**: Real-time preview of changes
- **Templates**: Pre-defined block templates

### Widget

- **iframe**: Isolated environment for rendering pages
- **Messaging**: Communication between editor and preview

## Recent Technical Enhancements

### HeaderBlock Technical Improvements

- **Type Safety**: Extended TypeScript interfaces with new properties (`mediaClassName`, `gridClassName`)

## Technical Constraints

1. **Browser Compatibility**:

   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - IE11 not supported

2. **Performance**:

   - Optimized bundle size
   - Lazy loading for editor components
   - Efficient rendering of complex pages

3. **Accessibility**:

   - WCAG 2.1 AA compliance
   - Keyboard navigation support
   - Screen reader compatibility

4. **Security**:
   - HTML sanitization for user-generated content
   - XSS protection
   - Safe iframe communication

## Integration Points

### React Applications

```jsx
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';

const Page = ({content}) => (
  <PageConstructorProvider>
    <PageConstructor content={content} />
  </PageConstructorProvider>
);
```

### Server-Side Rendering

```javascript
const {fullTransform} = require('@gravity-ui/page-constructor/server');

const {html} = fullTransform(content, {
  lang,
  extractTitle: true,
  allowHTML: true,
  path: __dirname,
  plugins,
});
```

### Editor Integration

```jsx
import {Editor} from '@gravity-ui/page-constructor/editor';

const MyAppEditor = ({initialContent, onChange, transformContent}) => (
  <Editor content={initialContent} onChange={onChange} transformContent={transformContent} />
);
```

### Custom Block Integration

```jsx
// Custom block component
const MyCustomBlock = (props) => {
  // Implementation
};

// Register with PageConstructor
<PageConstructor
  content={content}
  custom={{
    blocks: {
      'my-custom-block': MyCustomBlock,
    },
  }}
/>;
```

## Deployment Strategy

- **npm Package**: Published to npm registry
- **Semantic Versioning**: Following semver for releases
- **Alpha/Beta Releases**: For testing new features
- **Release Branches**: For maintaining multiple major versions
- **Storybook Deployment**: For documentation and examples

## Technical Debt and Limitations

1. **Legacy Support**:

   - Some deprecated props and components maintained for backward compatibility
   - Plans to remove in future major versions

2. **Bundle Size**:

   - Large dependency tree
   - Opportunity for tree-shaking improvements

3. **Browser Support**:

   - Modern browsers only
   - No IE11 support

4. **Mobile Optimization**:

   - Some components need better mobile adaptation
   - Touch interactions can be improved

5. **Documentation**:
   - Some advanced features lack detailed documentation
   - More examples needed for complex use cases
