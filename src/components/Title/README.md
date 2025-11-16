# Title

`type: "title"`

The **Title** component is used to display a section heading, optionally with a subtitle (description) and configurable styles, alignment, and link behavior.

---

## 🔧 Props

### `title`

Defines the main title content.  
It can be either a simple string or an object with the following structure:

| Property      | Type                                       | Default   | Description                                                                                                                          |
| ------------- | ------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `text`        | `string`                                   | —         | Main title text.                                                                                                                     |
| `textSize`    | `'s'` \| `'m'` \| `'l'` \|`'xs'` \| `'sm'` | `'m'`     | Title font size.                                                                                                                     |
| `url`         | `string`                                   | —         | Optional URL. When set, the title becomes a clickable link, and an arrow is automatically displayed at the end.                      |
| `resetMargin` | `boolean`                                  | `true`    | When `true`, removes automatic top margin. When `false`, the top margin depends on the `textSize` (see [_Margins_](#margins) below). |
| `anchor`      | `string`                                   | —         | Optional anchor ID for navigation.                                                                                                   |
| `justify`     | `'start'` \| `'center'` \| `'end'`         | `'start'` | Text alignment.                                                                                                                      |
| `urlTitle`    | `string`                                   | —         | Accessibility title attribute for the link.                                                                                          |
| `onClick`     | `() => void`                               | —         | Optional click handler.                                                                                                              |
| `custom`      | `string \| React.ReactNode`                | —         | Custom React node or text appended to the title.                                                                                     |
| `navTitle`    | `string`                                   | —         | Optional navigation title for use in table of contents.                                                                              |

---

### `subtitle`

`subtitle?: string`

Optional subtitle (description) text.  
Supports **YFM (Yandex Flavored Markdown)** formatting.

---

### `className`

`className?: string`

Optional CSS class name for the container.

---

### `colSizes`

`colSizes?: GridColumnSizesType`

Grid column size configuration for responsive layouts.  
Default: `{ all: 12, sm: 8 }`.

---

### `id`

`id?: string`

Optional HTML `id` attribute for the title container.

---

## 🧩 Example

```tsx
<Title
  title={{
    text: 'Section Heading',
    textSize: 'l',
    url: 'https://example.com',
    urlTitle: 'Go to example',
    resetMargin: false,
  }}
  subtitle="**This is** a subtitle with [YFM](https://example.com) support."
  colSizes={{all: 12, sm: 6}}
/>
```
