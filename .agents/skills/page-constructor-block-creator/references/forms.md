# Editor forms

Read this for every block/sub-block form. Use `src/blocks/Media/form.ts` as the
main example, `src/sub-blocks/BackgroundCard/form.ts` for cards, and
`src/form-generator-v2/types.ts` as the field contract. The generator's README
explains the controls; implementation is authoritative for edge behavior:
`components/Base/Base.tsx`, `components/Section/Section.tsx`,
`components/Select/Select.tsx`, `utils/fields.ts`, and `FormGenerator.tsx`.
Read the relevant control when using a capability not demonstrated here.

## Data contract

`form.ts` is a TypeScript module containing declarative descriptors, not a
serialized JSON file or AJV schema. Export `form` checked against `Fields` and
`defaultValue` containing initial **content**, without a `schema`/`content`
wrapper. A `satisfies Fields` check catches unsupported properties without an
unchecked cast. Connect both exports in the new namespaced config. Only when updating an existing old block, keep its already-supported deprecated config in sync; do not create a deprecated config for a new entity.

Every input's `name` is a path into the content consumed by the React component:

- `title` writes a scalar property.
- `media.light.image.desktop` writes nested objects.
- `buttons[{{buttonIndex}}].text` writes an array item after substitution.
- `media.video.src[0]` writes one fixed array slot; it is not a repeatable group.

Names are relative to the whole block, including inside static sections. A
section title does not create a data namespace. Keep paths, component props,
defaults and story data consistent. When maintaining an existing legacy AJV schema, also keep its constraints consistent with that existing content contract. Do not flatten arrays or change
strings to objects just to suit a control.

## Choose controls by stored value

| Value / purpose               | Field type                        | Details                                                   |
| ----------------------------- | --------------------------------- | --------------------------------------------------------- |
| Short string                  | `textInput`                       | `name`, `title`, optional placeholder/default             |
| Multiline string / YFM source | `textArea`                        | Writes raw source, not pre-rendered HTML                  |
| Boolean                       | `switch`                          | Boolean default, not `'true'`                             |
| One option                    | `select` or `segmentedRadioGroup` | Options have string `value` and optional `content` label  |
| Multiple options              | `select` with `multiple: true`    | Stores `string[]`; use an array default                   |
| List of strings               | `textListInput`                   | Stores `string[]`; supports placeholder and addButtonText |
| Color string                  | `colorInput`                      | Use the existing color control                            |
| Group of fields               | `section`                         | Nested `fields`; `opened` controls initial expansion      |
| Explanatory copy              | `text`                            | `text`, optional `level`/`color`; no `name`               |
| Visual separator              | `divider`                         | No `name`                                                 |

There is no general `number`, `file`, `object` or `array` field in this union.
For an unsupported value type, inspect a real analogue or surface the missing
control requirement. Do not assert a string select value is numeric. `select`
with `hasClear` writes `''` for cleared single selection and `[]` for multiple
selection; those must be valid content values or need deliberate conversion.

## Complete minimal example

This synthetic form demonstrates the contract. Adapt the names to the actual
component and check descriptors against the current `Fields` type; this is not
a new runtime component or a replacement for the richer Media form.

```ts
import type {Fields} from '../../form-generator-v2/types';

export const form = [
  {
    type: 'section',
    title: 'Content',
    opened: true,
    fields: [
      {type: 'textInput', title: 'Title', name: 'title'},
      {type: 'textArea', title: 'Text', name: 'text'},
      {type: 'switch', title: 'Show illustration', name: 'showImage'},
      {
        type: 'select',
        title: 'Theme',
        name: 'theme',
        options: [{value: 'light'}, {value: 'dark'}],
        defaultValue: 'light',
      },
      {
        type: 'textListInput',
        title: 'Tags',
        name: 'tags',
        defaultValue: [],
      },
    ],
  },
  {
    type: 'section',
    title: 'Links',
    index: 'linkIndex',
    withAddButton: true,
    itemTitle: 'Link {{linkIndex}}',
    itemView: 'card',
    fields: [
      {type: 'textInput', title: 'Text', name: 'links[{{linkIndex}}].text'},
      {type: 'textInput', title: 'URL', name: 'links[{{linkIndex}}].url'},
    ],
  },
  {
    type: 'textInput',
    title: 'Light illustration URL',
    name: 'image.light',
    when: [{field: 'showImage', operator: '===', value: true}],
  },
  {
    type: 'textInput',
    title: 'Dark illustration URL',
    name: 'image.dark',
    when: [{field: 'showImage', operator: '===', value: true}],
  },
] satisfies Fields;

export const defaultValue = {
  title: 'Notice',
  text: 'Example text',
  theme: 'light',
  showImage: true,
  tags: [],
  links: [{text: 'Learn more', url: 'https://example.com'}],
  image: {light: '/story-assets/light.svg', dark: '/story-assets/dark.svg'},
};
```

The image URLs above are illustrative values, not guaranteed story assets.
Choose real files from `.storybook/public/` when generating a story.

## Repeating objects and nested groups

Presence of `index` activates a section's array mode; `withAddButton` exposes the
button for further rows. Descendant input paths must contain exactly that
section's placeholder. The generator infers the array path from a descendant
`name`, so `index: 'linkIndex'` with `links[{{index}}].url` will not bind to
`links`. All inputs for one group must refer to the same array.

Use distinct placeholder names for nested arrays, for example
`items[{{itemIndex}}].buttons[{{buttonIndex}}].text`. Outer substitution happens
before the child section resolves its array. Do not reuse the outer index name
inside the child. The current path helpers reconstruct nested array paths from
bracketed segments: `items[0].content.buttons[{{buttonIndex}}].text` loses the
intervening `.content` segment and is not safe to use unchanged. The shown
`items[{{itemIndex}}].buttons[{{buttonIndex}}].text` shape is supported. If the
renderer requires an intervening object, surface this generator limitation
instead of silently changing the data contract. A static inner section does not need an index. `itemView` may
be `card` or `clear`; specify it rather than relying on undocumented defaults.

Test adding to `[]`, editing two rows independently, deleting first/middle/last,
and adding again. Deletion must splice the intended item and preserve siblings.
Use `textListInput` for `string[]` instead of a repeating object section:
adding appends `''`, removing the last row stores `[]`, and duplicates/order are
preserved. Do not add fake properties such as `tags[{{i}}].value` to strings.

## Visibility and initial values

`when` is a sequence of comparisons, with explicit logical operators between
comparisons. Supported operators are `===`, `!==`, `||`, `&&`; use actual value
types (`true` is different from `'true'`). For example, two conditions joined
with AND have this shape:

```ts
const when = [
  {field: 'showImage', operator: '===', value: true},
  {operator: '&&'},
  {field: 'theme', operator: '===', value: 'dark'},
];
```

An absent `when` means unconditional visibility; an empty `when: []` evaluates
false with current non-null content. Multiple comparisons without a connector
do not imply AND. Avoid unsupported comparison operators or expression strings.

The config's `schema.default` seeds a newly inserted block. Controls that pass
`name` and `defaultValue` to Base (such as text inputs and selects) write their
default when becoming visible with an undefined path; existing `false`, `''`
or `[]` values are preserved. Check the actual control rather than assuming
all controls persist their defaults.

Switch currently uses its field-level `defaultValue` only for the displayed
state and does not pass it or `name` to Base. Put switch selector defaults in
the config's `schema.default` content so dependent `when` conditions see them.
Keep content defaults and control defaults consistent.

An individually conditional input that passes `name` and `onUpdate` to Base
clears its stored path when changing from visible to hidden. Switch does not
pass `name` to Base, so hiding that control retains its stored value. A field
hidden on first mount is not the same case.
Putting `when` on a whole section does not guarantee clearing every descendant
value. Test the actual control and scope; do not promise data preservation when
switching variants. If variants share data that must survive switching, choose
the structure/visibility scope deliberately rather than adding unsupported flags.

Editor-only selectors such as Media's `_mediaType` select which controls are
shown. Do not confuse them with persisted rendering props or add them blindly
to a strict AJV schema. Check the real save/validation path for new and existing blocks: editor-only fields are not necessarily part of the validated content. New blocks do not create `schema.ts` or AJV registrations; their config's `schema` property still supplies the editor form, defaults and preview.

For media themes use the actual prop shape (for example
`media.light.image.desktop` and `media.dark.image.desktop` in Media). Do not use
`media.image.light` if the renderer expects the theme outside `image`. A theme
picker and themed data are separate concepts.

## Verify the generated form

Expose `parameters: {inputs: form}` in the story metadata. Typecheck descriptors
against `Fields`, then inspect the actual panel: values should change component
props and preview, not just display in controls. Check nested paths, an empty
list, add/delete, conditions both ways, initial defaults and light/dark media.
Check both consumers when relevant: Storybook's form addon uses the whole-content `onUpdate` callback, while editor-v2's BlockConfigForm uses `onUpdateByKey`. Visibility and deletion must be verified through the intended consumer, not inferred from the other panel.
Inspect the namespaced editor config. For existing old blocks only, also check their preserved AJV validation, deprecated configs and old data separately. Do not claim these interactions passed from a descriptor typecheck.
