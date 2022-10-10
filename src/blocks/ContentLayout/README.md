`properties:` — Content cube properties (optional)

- `size?: 's' | 'l'` — Cube size that defines font sizes (defaults to l)
- `background?: BackgroundImage` — Special background properties described in the **Content blocks** section.
- `centered?: false | true` — Indicates if text is centered (false by default).
- `theme?: 'default' | 'dark' | 'light'` — Cube theme: default, dark, or monochrome light ('default' by default).
- `textWidth?: 's' | 'm' | 'l'` — Number of columns occupied by content within a cube: 6, 8, and 10 out of 12 columns, respectively.

`textContent:` — See the [Content](?path=/story/components-content--default&viewMode=docs) component.

`fileContent?: FileLink[]` — Array of objects that describe file links

- `href: string` — File download link
- `text: string` — File description
