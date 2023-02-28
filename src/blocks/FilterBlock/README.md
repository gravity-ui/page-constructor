`type: "filter-block"`

`title?: Title | string` — Title.

`description?: string` — Text.

`filterTags: []` - Tags by which content can be filtered.

`tagSize: 's' | 'm' | 'l' | 'xl'` - Size of filter tags.

`allTag: boolean | string` - Specifies whether to show the 'All' tag and what label to use. The 'All' label is used in case of the `true` value.

`child: Block` — A Block whose children will be filtered.

The following blocks are currently supported:

- [`CardLayout`](?path=/story/blocks-cardlayout--default&viewMode=docs)
