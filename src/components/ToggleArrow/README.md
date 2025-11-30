# ToggleArrow

`type: "toggle-arrow"`

The **ToggleArrow** component is a small, animated arrow icon used for collapsible sections, navigation panels, and accordions.

---

## 🔧 Props

| Prop        | Type                         | Default        | Description                                   |
| ----------- | ---------------------------- | -------------- | --------------------------------------------- |
| `type`      | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the arrow.                     |
| `iconType`  | `'default' \| 'navigation'`  | `'default'`    | Visual icon variant.                          |
| `open`      | `boolean`                    | `false`        | Whether the arrow is in open (rotated) state. |
| `size`      | `number`                     | `16`           | Icon size in pixels.                          |
| `thin`      | `boolean`                    | `false`        | Thinner stroke style.                         |
| `slow`      | `boolean`                    | `false`        | Slower transition animation.                  |
| `className` | `string`                     | —              | Optional custom CSS class.                    |

---

## 🧩 Example

```tsx
<ToggleArrow type="vertical" iconType="navigation" open size={24} thin slow />
```
