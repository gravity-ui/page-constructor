# Data preparation

This chapter provides documentaion for server utilities for transforming content, including Yandex Flavored Markdown (YFM) to HTML conversion and text processing. Key features include:

- fullTransform: Converts YFM content into HTML with customizable options.

- Utilities: Includes typografToText, typografToHTML, and yfmTransformer for text processing in custom components.

- createItemsParser: A flexible utility for transforming specific fields in complex data structures, supporting nested fields and arrays.

## Server utils

The package provides a set of server utilities for transforming your content.

```ts
const {fullTransform} = require('@gravity-ui/page-constructor/server');

const {html} = fullTransform(content, {
  lang,
  extractTitle: true,
  allowHTML: true,
  path: __dirname,
  plugins,
});
```

Under the hood, a package is used to transform Yandex Flavored Markdown into HTML - `diplodoc/transfrom`, so it is also in peer dependencies

You can also use useful utilities in the places you need, for example in your custom components

```ts
const {
  typografToText,
  typografToHTML,
  yfmTransformer,
} = require('@gravity-ui/page-constructor/server');

const post = {
  title: typografToText(title, lang),
  content: typografToHTML(content, lang),
  description: yfmTransformer(lang, description, {plugins}),
};
```

You can find more utilities in this [section](https://github.com/gravity-ui/page-constructor/tree/main/src/text-transform)

## `createItemsParser` Method Documentation

The `createItemsParser` method is a utility function designed to parse and transform items in a flexible and customizable way. It is particularly useful when dealing with complex data structures that require specific fields to be transformed using a provided transformer function. This method is highly configurable, allowing you to specify which fields to transform and how to handle nested fields.

### Method Signature

```typescript
export const createItemsParser = (fields: string[]) => (transformer: Transformer, items: Item[]) => Item[];
```

### Parameters

- **fields**: An array of strings specifying the fields to be transformed. These fields can be nested, using dot notation (e.g., `'nested.field'`).
- **transformer**: A function that takes a string and returns a transformed string. This function will be applied to the specified fields.
- **items**: An array of items to be parsed and transformed. Each item can be a string or a complex object.

### Return Value

- Returns an array of items with the specified fields transformed by the `transformer` function.

## Usage Examples

### Example 1: Basic Usage

In this example, we want to transform the `text` and `additionalInfo` fields of each item in the `items` array using the `yfmTransformer`.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['text', 'additionalInfo']),
};
```

**Input:**

```json
[
  {"text": "Hello, world!", "additionalInfo": "This is a test."},
  {"text": "Another item", "additionalInfo": "More info here."}
]
```

**Output:**

```json
[
  {"text": "Transformed: Hello, world!", "additionalInfo": "Transformed: This is a test."},
  {"text": "Transformed: Another item", "additionalInfo": "Transformed: More info here."}
]
```

### Example 2: Nested Fields

In this example, we want to transform a nested field `list.text` within each item.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['list.text']),
  renderInline: true,
};
```

**Input:**

```json
[{"list": {"text": "Nested text 1"}}, {"list": {"text": "Nested text 2"}}]
```

**Output:**

```json
[{"list": {"text": "Transformed: Nested text 1"}}, {"list": {"text": "Transformed: Nested text 2"}}]
```

### Example 3: Mixed Data Types

In this example, the `items` array contains a mix of strings and complex objects. The `createItemsParser` will handle both types appropriately.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['text', 'list.text']),
};
```

**Input:**

```json
["Simple string", {"text": "Object text", "list": {"text": "Nested text"}}]
```

**Output:**

```json
[
  "Transformed: Simple string",
  {"text": "Transformed: Object text", "list": {"text": "Transformed: Nested text"}}
]
```

## Key Features

- **Flexible Field Specification**: You can specify both top-level and nested fields using dot notation.
- **Mixed Data Handling**: The method can handle arrays containing both strings and complex objects.
- **Custom Transformers**: You can pass any transformer function to apply custom transformations to the specified fields.

## Notes

- If a field is not found in an item, it will be skipped.
- If a nested field is specified but the parent object is not an object or is an array, the transformation will be skipped for that field.
- The method does not mutate the original items but returns a new array with the transformed items.

### Handling Nested Arrays

When a nested field is an array, the `createItemsParser` method will iterate over each element in the array and apply the transformer function to the specified subfield. This is particularly useful when dealing with arrays of objects that contain fields requiring transformation.

### Example 4: Nested Field as an Array

In this example, we want to transform the `text` field within each object in the `list` array, which is a nested field of the `items`.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['list.text']),
};
```

**Input:**

```json
[
  {
    "list": [{"text": "Nested text 1"}, {"text": "Nested text 2"}]
  },
  {
    "list": [{"text": "Nested text 3"}, {"text": "Nested text 4"}]
  }
]
```

**Output:**

```json
[
  {
    "list": [{"text": "Transformed: Nested text 1"}, {"text": "Transformed: Nested text 2"}]
  },
  {
    "list": [{"text": "Transformed: Nested text 3"}, {"text": "Transformed: Nested text 4"}]
  }
]
```

## Full Example with All Cases

Here’s a comprehensive example that includes all possible cases: top-level fields, nested objects, and nested arrays.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['text', 'list.text', 'details.info']),
};

const transformedItems = config.parser(config.transformer, items);
```

**Input:**

```json
[
  {
    "text": "Top-level text",
    "list": [{"text": "Nested text 1"}, {"text": "Nested text 2"}],
    "details": {
      "info": "Nested info"
    }
  },
  {
    "text": "Another top-level text",
    "list": {"text": "Nested text 3"},
    "details": {
      "info": "Another nested info"
    }
  }
]
```

**Output:**

```json
[
  {
    "text": "Transformed: Top-level text",
    "list": [{"text": "Transformed: Nested text 1"}, {"text": "Transformed: Nested text 2"}],
    "details": {
      "info": "Transformed: Nested info"
    }
  },
  {
    "text": "Transformed: Another top-level text",
    "list": {"text": "Transformed: Nested text 3"},
    "details": {
      "info": "Transformed: Another nested info"
    }
  }
]
```
