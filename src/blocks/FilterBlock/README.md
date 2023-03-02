`type: "filter-block"`

`title?: Title | string` — Title.

`description?: string` — Text.

`filterTags: []` - Tags by which content can be filtered.

`tagSize: 's' | 'm' | 'l' | 'xl'` - Size of filter tags.

`allTag: boolean | string` - Specifies whether to show the 'All' tag. If the value is a non-falsy string, the block uses the value as label for the `All` tag.

`items:` — Items, the block displays.

- `tags: string[]` - tags assigned to the card.

- `card: SubBlock` - card to show.
