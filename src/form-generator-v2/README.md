# Form generator v2

Declarative block editor forms: a `Fields` array describes the UI.

## `FormGenerator` component

```tsx
import FormGenerator from './FormGenerator';

<FormGenerator blockConfig={fields} contentConfig={content} onUpdate={setContent} />;
```

| Prop            | Type                                    | Required | Description                                               |
| --------------- | --------------------------------------- | -------- | --------------------------------------------------------- |
| `blockConfig`   | `Fields`                                | yes      | Array of field descriptors                                |
| `contentConfig` | `Content`                               | yes      | Current form values object                                |
| `onUpdate`      | `(content: Content) => void`            | no       | Called with the full updated content object on any change |
| `onUpdateByKey` | `(key: string, value: unknown) => void` | no       | Called with the individual changed key/value pair         |
| `className`     | `string`                                | no       | Extra CSS class for the root element                      |

---

## Core concepts

### `When` condition shape

Conditions are evaluated in order; use `operator` without `field` for logical combinators between previous results.

| Property   | Type                             | Description                               |
| ---------- | -------------------------------- | ----------------------------------------- |
| `field`    | `string`                         | Path in `content` (dot bracket segments). |
| `operator` | `string`                         | One of the string literals listed below.  |
| `value`    | `string` or `boolean` (optional) | Right-hand side for `===` / `!==`.        |

Permitted `operator` values (TypeScript union):

```ts
'===' | '!==' | '||' | '&&';
```

---

## `section`

Collapsible group **or** repeating card group, depending on whether `index` is set.

- **Static mode** (`index` absent): renders a collapsible panel with a toggle.
- **Array mode** (`index` present): renders a list of items, one per array entry, with add/delete controls. Field name paths use `{{indexName}}` placeholders that are replaced with the row index at render time.

| Property        | Type                | Required | Description                                                                                                               |
| --------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `type`          | `'section'`         | yes      | Discriminator.                                                                                                            |
| `title`         | `string`            | yes      | Section heading (static mode) or row title template — may include `{{indexName}}` (array mode).                           |
| `fields`        | `Fields`            | yes      | Nested form items.                                                                                                        |
| `when`          | `When`              | no       | Show section only when conditions pass.                                                                                   |
| `opened`        | `boolean`           | no       | Initial expanded state. Static mode only.                                                                                 |
| `index`         | `string`            | no       | Placeholder id used in `{{index}}` inside child `name` paths (e.g. `'index'`, `'index1'`). Presence activates array mode. |
| `withAddButton` | `boolean`           | no       | Show "Add" button to append a row. Array mode only.                                                                       |
| `itemTitle`     | `string`            | no       | Header text template for each array item — may include `{{indexName}}`. Array mode only.                                  |
| `itemView`      | `'card' \| 'clear'` | no       | `card` = bordered Card with padding; `clear` = flat div. Array mode only. Defaults to `clear`.                            |

**Array mode example** — `buttons[{{index}}].text` with `index: 'index'` resolves to `buttons[0].text`, `buttons[1].text`, etc.

---

## `textInput`

Single-line text.

| Property       | Type          | Required | Description                                                                              |
| -------------- | ------------- | -------- | ---------------------------------------------------------------------------------------- |
| `type`         | `'textInput'` | yes      | Discriminator.                                                                           |
| `name`         | `string`      | yes      | Path in `content`.                                                                       |
| `title`        | `string`      | yes      | Label.                                                                                   |
| `defaultValue` | `string`      | no       | Value written into `content` when the field first becomes visible and the path is empty. |
| `when`         | `When`        | no       | Visibility.                                                                              |

---

## `textArea`

Multi-line text.

| Property       | Type         | Required | Description                                                                              |
| -------------- | ------------ | -------- | ---------------------------------------------------------------------------------------- |
| `type`         | `'textArea'` | yes      | Discriminator.                                                                           |
| `name`         | `string`     | yes      | Path in `content`.                                                                       |
| `title`        | `string`     | yes      | Label.                                                                                   |
| `defaultValue` | `string`     | no       | Value written into `content` when the field first becomes visible and the path is empty. |
| `when`         | `When`       | no       | Visibility.                                                                              |

---

## `markdownEditor`

Markdown/YFM input powered by `@gravity-ui/markdown-editor`. Opens in visual mode;
the settings menu switches between visual editing and Markdown source.

| Property       | Type               | Required | Description                                                   |
| -------------- | ------------------ | -------- | ------------------------------------------------------------- |
| `type`         | `'markdownEditor'` | yes      | Discriminator.                                                |
| `name`         | `string`           | yes      | Path in `content`, including nested and array paths.          |
| `title`        | `string`           | yes      | Label.                                                        |
| `defaultValue` | `string`           | no       | Markdown used when the field becomes visible without a value. |
| `placeholder`  | `string`           | no       | Placeholder in both editing modes.                            |
| `when`         | `When`             | no       | Visibility conditions.                                        |

Changes are stored as Markdown strings. Clearing stores `''`, which takes
precedence over `defaultValue`. External content updates are applied without
emitting another update. Hiding the field clears its value using the same rules
as other inputs. The input supplies its own toaster context, uses UIKit's theme
and follows `LocaleContext.lang` (Russian by default). Raw HTML and local file uploads are disabled.

```tsx
const fields: Fields = [
  {
    type: 'markdownEditor',
    name: 'page.description',
    title: 'Description',
    defaultValue: '## About\n\nDescribe the **page**.',
    placeholder: 'Write Markdown',
  },
];
```

The builder palette exposes this field as **Markdown**. Its inspector edits the
label, name, placeholder, default Markdown and visibility conditions. Existing
`textArea` fields and AJV conversion retain their behavior.

---

## `textListInput`

Editable list of strings. Each row contains a text input and a remove button;
the add button appends an empty string. Values are stored as `string[]`, preserving
empty strings, duplicates, and order. Removing the final row stores `[]`.

| Property        | Type              | Required | Description                                |
| --------------- | ----------------- | -------- | ------------------------------------------ |
| `type`          | `'textListInput'` | yes      | Discriminator.                             |
| `name`          | `string`          | yes      | Path to the string array in `content`.     |
| `title`         | `string`          | yes      | Heading above the list.                    |
| `defaultValue`  | `string[]`        | no       | Initial values when the path is undefined. |
| `placeholder`   | `string`          | no       | Placeholder for each row's input.          |
| `addButtonText` | `string`          | no       | Add button label. Defaults to `Add item`.  |
| `when`          | `When`            | no       | Visibility.                                |

```tsx
const fields: Fields = [
  {
    type: 'textListInput',
    name: 'items',
    title: 'Items',
    placeholder: 'Enter a string',
    addButtonText: 'Add string',
    defaultValue: ['First', 'Second'],
  },
];
```

Resulting content:

```json
{
  "items": ["First", "Second"]
}
```

Use a repeating `section` for arrays of objects with several fields per item.

---

## `select`

Dropdown with single or multiple selection. Omit `multiple` (or set it to `false`)
to store a string; set `multiple: true` to store a `string[]` of option values.

| Property       | Type                                       | Required | Description                                                         |
| -------------- | ------------------------------------------ | -------- | ------------------------------------------------------------------- |
| `type`         | `'select'`                                 | yes      | Discriminator.                                                      |
| `name`         | `string`                                   | yes      | Path in `content`.                                                  |
| `title`        | `string`                                   | yes      | Label.                                                              |
| `options`      | `Array<{value: string; content?: string}>` | yes      | `value` is stored; `content` is displayed, falling back to `value`. |
| `multiple`     | `boolean`                                  | no       | Enable multiple selection. Defaults to `false`.                     |
| `defaultValue` | `string` or `string[]`                     | no       | String for single selection; string array when `multiple: true`.    |
| `hasClear`     | `boolean`                                  | no       | Show a clear button.                                                |
| `placeholder`  | `string`                                   | no       | Placeholder. Defaults to `Not selected`.                            |
| `when`         | `When`                                     | no       | Visibility.                                                         |

`SelectField` combines common `SelectBaseField` properties with a discriminated
union: TypeScript checks that `defaultValue` matches `multiple`.

```tsx
const fields: Fields = [
  {
    type: 'select',
    name: 'layout',
    title: 'Layout',
    options: [
      {value: 'default', content: 'Default'},
      {value: 'wide', content: 'Wide'},
    ],
    defaultValue: 'default',
  },
  {
    type: 'select',
    name: 'layouts',
    title: 'Layouts',
    multiple: true,
    hasClear: true,
    options: [
      {value: 'default', content: 'Default'},
      {value: 'wide', content: 'Wide'},
    ],
    defaultValue: ['default', 'wide'],
  },
];
```

Resulting content:

```json
{
  "layout": "default",
  "layouts": ["default", "wide"]
}
```

Clearing a single select stores `''`; clearing a multiple select stores `[]`.
These explicit empty values take precedence over `defaultValue`. If a value is
missing or `null`, the select displays its default without overwriting existing
user input when that default changes.

---

## `segmentedRadioGroup`

Segmented control (mutually exclusive options).

| Property       | Type                                         | Required | Description                                                 |
| -------------- | -------------------------------------------- | -------- | ----------------------------------------------------------- |
| `type`         | `'segmentedRadioGroup'`                      | yes      | Discriminator.                                              |
| `name`         | `string`                                     | yes      | Path in `content`.                                          |
| `title`        | `string`                                     | yes      | Label.                                                      |
| `options`      | `Array<{ value: string; content?: string }>` | yes      | Segments.                                                   |
| `defaultValue` | `string`                                     | no       | Written into `content` on mount if the path is still empty. |
| `when`         | `When`                                       | no       | Visibility.                                                 |

---

## `switch`

Boolean toggle.

| Property       | Type       | Required | Description        |
| -------------- | ---------- | -------- | ------------------ |
| `type`         | `'switch'` | yes      | Discriminator.     |
| `name`         | `string`   | yes      | Path in `content`. |
| `title`        | `string`   | yes      | Label.             |
| `defaultValue` | `boolean`  | no       | Default Value.     |
| `when`         | `When`     | no       | Visibility.        |

---

## `colorInput`

Color picker (Gravity UI `unstable_ColorPicker`).

| Property       | Type           | Required | Description                                           |
| -------------- | -------------- | -------- | ----------------------------------------------------- |
| `type`         | `'colorInput'` | yes      | Discriminator.                                        |
| `name`         | `string`       | yes      | Path in `content`.                                    |
| `title`        | `string`       | yes      | Label.                                                |
| `defaultValue` | `string`       | no       | Hex color string. Falls back to `#000000` if omitted. |
| `when`         | `When`         | no       | Visibility.                                           |

---

## `divider`

Horizontal line for visual separation between fields — no value stored in `content`.

| Property | Type        | Required | Description    |
| -------- | ----------- | -------- | -------------- |
| `type`   | `'divider'` | yes      | Discriminator. |
| `when`   | `When`      | no       | Visibility.    |

---

## `text`

Static hint text — no value stored in `content`.

| Property | Type                 | Required | Description                                                            |
| -------- | -------------------- | -------- | ---------------------------------------------------------------------- |
| `type`   | `'text'`             | yes      | Discriminator.                                                         |
| `text`   | `string`             | yes      | Copy shown in the form.                                                |
| `level`  | `'danger' \| 'info'` | no       | Applies a coloured background banner style.                            |
| `color`  | `TextColor`          | no       | Gravity UI text color token (`'primary'`, `'hint'`, `'danger'`, etc.). |
| `when`   | `When`               | no       | Visibility.                                                            |
