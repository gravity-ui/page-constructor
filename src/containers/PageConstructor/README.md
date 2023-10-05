PageConstructor container

`animated?: bool` — Enables/disables animation for the entire page (enabled by default).

`menu?: bool` — Indicates whether to show an automatically generated menu.

`form?: 'contact-sales | interconnect | preview'` — Sets the form to be displayed in the modal window when switching to the page with #form.

`background?:` — Background of the whole page.

- `color: string` - background color
- `animated: true | false` - background animation on load and on scroll
- `parallax?: true | false` — enable/disable the parallax effect
- `video?: Video` - [Video](?path=/docs/documentation-types--docs#Video)
- `image?: Image` - [ImageObjectProps](?path=/docs/documentation-types--docs#ImageObjectProps)
- `fullWidthMedia?: true | false` - Media width: Picture or Video to the entire screen width or as per column size.
- `height?: number` - height of media
