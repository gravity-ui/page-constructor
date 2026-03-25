# Form generator v2

Declarative block editor forms: a `Fields` array describes the UI.

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

Collapsible group with optional note and nested `fields`.

| Property | Type                                          | Required | Description                             |
| -------- | --------------------------------------------- | -------- | --------------------------------------- |
| `type`   | `'section'`                                   | yes      | Discriminator.                          |
| `title`  | `string`                                      | yes      | Section heading.                        |
| `opened` | `boolean`                                     | no       | Initial expanded state.                 |
| `fields` | `Fields`                                      | yes      | Nested form items.                      |
| `when`   | `When`                                        | no       | Show section only when conditions pass. |
| `note`   | `{ text: string; level: 'danger' or 'info' }` | no       | Inline note above the section body.     |

---

## `textInput`

Single-line text.

| Property | Type          | Required | Description        |
| -------- | ------------- | -------- | ------------------ |
| `type`   | `'textInput'` | yes      | Discriminator.     |
| `name`   | `string`      | yes      | Path in `content`. |
| `title`  | `string`      | yes      | Label.             |
| `when`   | `When`        | no       | Visibility.        |

---

## `textArea`

Multi-line text.

| Property | Type         | Required | Description        |
| -------- | ------------ | -------- | ------------------ |
| `type`   | `'textArea'` | yes      | Discriminator.     |
| `name`   | `string`     | yes      | Path in `content`. |
| `title`  | `string`     | yes      | Label.             |
| `when`   | `When`       | no       | Visibility.        |

---

## `select`

Dropdown (single value).

| Property   | Type                                         | Required | Description                                                 |
| ---------- | -------------------------------------------- | -------- | ----------------------------------------------------------- |
| `type`     | `'select'`                                   | yes      | Discriminator.                                              |
| `name`     | `string`                                     | yes      | Path in `content`.                                          |
| `title`    | `string`                                     | yes      | Label.                                                      |
| `options`  | `Array<{ value: string; content?: string }>` | yes      | Options; `content` is the visible label, `value` is stored. |
| `hasClear` | `boolean`                                    | no       | Allow clearing the selection.                               |
| `when`     | `When`                                       | no       | Visibility.                                                 |

---

## `segmentedRadioGroup`

Segmented control (mutually exclusive options).

| Property       | Type                                         | Required | Description                                                                                |
| -------------- | -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `type`         | `'segmentedRadioGroup'`                      | yes      | Discriminator.                                                                             |
| `name`         | `string`                                     | yes      | Path in `content`.                                                                         |
| `title`        | `string`                                     | yes      | Label.                                                                                     |
| `options`      | `Array<{ value: string; content?: string }>` | yes      | Segments.                                                                                  |
| `defaultValue` | `string`                                     | no       | Written into `content` on mount if the path is still empty (see component implementation). |
| `when`         | `When`                                       | no       | Visibility.                                                                                |

---

## `switch`

Boolean toggle.

| Property | Type       | Required | Description        |
| -------- | ---------- | -------- | ------------------ |
| `type`   | `'switch'` | yes      | Discriminator.     |
| `name`   | `string`   | yes      | Path in `content`. |
| `title`  | `string`   | yes      | Label.             |
| `when`   | `When`     | no       | Visibility.        |

---

## `colorInput`

Color picker (Gravity UI `unstable_ColorPicker`).

| Property | Type           | Required | Description        |
| -------- | -------------- | -------- | ------------------ |
| `type`   | `'colorInput'` | yes      | Discriminator.     |
| `name`   | `string`       | yes      | Path in `content`. |
| `title`  | `string`       | yes      | Label.             |
| `when`   | `When`         | no       | Visibility.        |

---

## `text`

Static hint text.

| Property | Type     | Required | Description                           |
| -------- | -------- | -------- | ------------------------------------- |
| `type`   | `'text'` | yes      | Discriminator.                        |
| `text`   | `string` | yes      | Markdown-free copy shown in the form. |
| `when`   | `When`   | no       | Visibility.                           |

---

## `oneTypeGroup`

Repeating block for **array** data. Template field names use a placeholder as example, `{{index}}` or `{{index1}}`, replaced with the row index.

| Property        | Type             | Required | Description                                                                            |
| --------------- | ---------------- | -------- | -------------------------------------------------------------------------------------- |
| `type`          | `'oneTypeGroup'` | yes      | Discriminator.                                                                         |
| `index`         | `string`         | yes      | Placeholder id used in `{{index}}` inside child `name` paths (e.g. `index`, `index1`). |
| `title`         | `string`         | yes      | Row title pattern; may include `{{index}}`.                                            |
| `fields`        | `Fields`         | yes      | Fields for one row (with placeholders in `name`).                                      |
| `withAddButton` | `boolean`        | no       | Show “Add” to append a row.                                                            |
| `when`          | `When`           | no       | Visibility of the whole group.                                                         |

**Example path:** `buttons[{{index}}].text` with `index: 'index'` resolves to `buttons[0].text`, `buttons[1].text`, etc.

---
