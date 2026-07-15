# Table

Renders a title followed by a comparison-style table whose cells are plain strings or numbers. A legend column can be marked with `disk` or `tick` markers, and an optional legend list explains the marked columns.

## Block type

`type: 'table-block'`

## When to use

- Side-by-side feature/plan comparison tables.
- Dense matrices of boolean-style checks ("0"/"1") with a legend.
- Tabular reference data that needs per-column text alignment control.

## Example

```json
{
  "type": "table-block",
  "title": "Lorem ipsum dolor sit amet",
  "table": {
    "content": [
      ["Lorem", "ipsum 1", "dolor 2", "sit 3"],
      ["Lorem 1", "0", "0", "0"],
      ["Lorem 2", "0", "0", "1"],
      ["Lorem 3", "1", "1", "1"]
    ],
    "legend": ["ipsum 1", "ipsum 2"],
    "marker": "tick",
    "justify": ["start", "center", "center", "center"],
    "caption": "Comparison of features"
  }
}
```

## Properties

| Property           | Type         | Default | Description                   |
| ------------------ | ------------ | ------- | ----------------------------- |
| `title` _required_ | `string`     | —       | Section heading (plain text). |
| `table` _required_ | `TableProps` | —       | Table definition. See below.  |

### `table`

| Property             | Type                               | Default | Description                                                                                   |
| -------------------- | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `content` _required_ | `(string \| number)[][]`           | —       | Rows of cells. The first row is treated as the header row. Each cell is a string or a number. |
| `legend`             | `string[]`                         | —       | YFM captions describing the marked columns; rendered as a legend list.                        |
| `hideLegend`         | `boolean`                          | —       | Hides the rendered legend list while keeping markers in the table.                            |
| `marker`             | `'disk' \| 'tick'`                 | —       | Marker style applied to legend cells. When omitted, no marker is rendered.                    |
| `justify`            | `('start' \| 'center' \| 'end')[]` | —       | Per-column horizontal alignment. Values map to columns by index.                              |
| `caption`            | `string`                           | —       | Accessible name for the table (not displayed visually).                                       |

### Common properties

Inherits: `anchor`, `visible`, `indent` (`{top?, bottom?}`), `qa`, `className`, `when`, `context`. See the root README for details.

## Themed values

This block does not introduce theme-aware properties of its own.

## Storybook

[Table](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-table-block--docs)
