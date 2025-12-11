# ErrorWrapper

The `ErrorWrapper` component is used to gracefully handle and display local errors in UI sections.  
When the `isError` flag is set to `true`, it shows an error message and an optional retry button.  
When `isError` is `false`, it renders its children content.

## Installation / Import

```tsx
import ErrorWrapper from './ErrorWrapper';
```

## When to Use

- Show a clear error state for a specific part of the interface (e.g., failed data load).

- Wrap a component to display either content or an error depending on state.

- Provide an inline retry mechanism.

## Props

| Name         | Type              | Required | Default | Description                                |
| ------------ | ----------------- | -------- | ------- | ------------------------------------------ |
| `text`       | `string`          | ✅       | —       | Error message text.                        |
| `buttonText` | `string`          | ✅       | —       | Text for the retry button.                 |
| `handler`    | `() => void`      | ✅       | —       | Callback triggered on retry button click.  |
| `isError`    | `boolean`         | ✅       | —       | Show error (`true`) or children (`false`). |
| `children`   | `React.ReactNode` | ✅       | —       | Content rendered when no error occurs.     |
| `className`  | `string`          | ❌       | —       | Optional CSS class for additional styling. |

## Example

```tsx
import React from 'react';
import ErrorWrapper from './ErrorWrapper';

function DataPanel() {
  const [isError, setIsError] = React.useState(true);

  const handleRetry = () => {
    console.log('Retry clicked');
    setIsError(false);
  };

  return (
    <ErrorWrapper
      text="Something went wrong"
      buttonText="Try again"
      isError={isError}
      handler={handleRetry}
    >
      <div>Data loaded successfully!</div>
    </ErrorWrapper>
  );
}
```
