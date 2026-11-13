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

## `codeInput`

Monaco-based code editor. Values are stored as strings, including while invalid.

| Property       | Type                                    | Required | Description                                                           |
| -------------- | --------------------------------------- | -------- | --------------------------------------------------------------------- |
| `type`         | `'codeInput'`                           | yes      | Discriminator.                                                        |
| `name`         | `string`                                | yes      | Path in `content`.                                                    |
| `title`        | `string`                                | yes      | Label.                                                                |
| `defaultValue` | `string`                                | no       | Initial value when the field becomes visible and its path is empty.   |
| `when`         | `When`                                  | no       | Visibility.                                                           |
| `language`     | `CodeLanguage`                          | no       | Either `'yaml'` (default) or `'json'`.                                |
| `height`       | `number`                                | no       | Editor height in pixels. Defaults to `220`.                           |
| `validate`     | `(code: string) => string \| undefined` | no       | Synchronous custom validator. Return an error message or `undefined`. |

`validate` runs for the initial value and whenever the value or validator changes.
Its message is displayed in a separate footer below the editor; it does not block
content updates. The footer reserves space even without errors. Messages use a
monospace font and scroll vertically when their height exceeds 140 px.
Monaco's built-in errors and warnings are also shown there, with their line and
column numbers. Diagnostics are scoped to the field's current document and
disappear when the issue is fixed. YAML syntax is checked automatically with
`js-yaml`, including when no YAML language service is configured. These errors
are also added to the document's Monaco markers. Diagnostics for other languages
depend on the language services configured by the host application.
No page-constructor JSON Schema validation is applied automatically.

```tsx
const fields: Fields = [
  {
    type: 'codeInput',
    name: 'config',
    title: 'Config',
    language: 'json',
    validate: (code) => {
      try {
        JSON.parse(code);
        return undefined;
      } catch {
        return 'Enter valid JSON.';
      }
    },
  },
];
```

Validator functions must be supplied programmatically: JSON serialization does
not preserve them. Attach them again after loading a saved form configuration.

`CodeInput` and the `FormBuilderV2` language selector support YAML and JSON.
New code fields use YAML. Choose JSON with `language: 'json'` or the builder's
language selector.

---

## `select`

Dropdown (single value).

| Property       | Type                                         | Required | Description                                                 |
| -------------- | -------------------------------------------- | -------- | ----------------------------------------------------------- |
| `type`         | `'select'`                                   | yes      | Discriminator.                                              |
| `name`         | `string`                                     | yes      | Path in `content`.                                          |
| `title`        | `string`                                     | yes      | Label.                                                      |
| `options`      | `Array<{ value: string; content?: string }>` | yes      | Options; `content` is the visible label, `value` is stored. |
| `defaultValue` | `string`                                     | no       | Pre-selected value on mount if the path is empty.           |
| `hasClear`     | `boolean`                                    | no       | Allow clearing the selection.                               |
| `when`         | `When`                                       | no       | Visibility.                                                 |

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

---
