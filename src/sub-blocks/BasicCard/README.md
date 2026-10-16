# BasicCard

A general-purpose card with an optional icon (image or Gravity UI icon) and text content (title, text, links, buttons, or a content list). The simplest and most versatile card.

## Sub-block type

`type: 'basic-card'`

## Used in

Accepted as a child of: `card-layout-block`, `slider-block`, `slider-old-block`.

## Example

```json
{
  "type": "basic-card",
  "title": "Tell a story",
  "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco.",
  "icon": {
    "light": "/story-assets/icon_1_light.svg",
    "dark": "/story-assets/icon_1_dark.svg"
  },
  "iconPosition": "top",
  "url": "https://example.com",
  "urlTitle": "Opens in a new tab",
  "buttons": [{"text": "Read more", "theme": "action", "url": "https://example.com"}]
}
```

## Properties

| Property               | Type                                         | Default     | Description                                                                                              |
| ---------------------- | -------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `type` _required_      | `'basic-card'`                               | —           | Sub-block discriminator.                                                                                 |
| `when`                 | `string`                                     | —           | Conditional rendering expression.                                                                        |
| `title`                | `string \| TitleProps`                       | —           | Card title (plain string or [Title](?path=/docs/documentation-types--docs#title-block-title) options).   |
| `text`                 | `string`                                     | —           | Body text (YFM supported).                                                                               |
| `additionalInfo`       | `string`                                     | —           | Secondary gray text (YFM supported).                                                                     |
| `size`                 | `'s' \| 'm' \| 'l' \| 'xl'`                  | `'s'`       | Content size; controls font sizes.                                                                       |
| `links`                | `LinkProps[]`                                | —           | Array of [links](?path=/docs/documentation-types--docs#link).                                            |
| `buttons`              | `ButtonProps[]`                              | —           | Array of [buttons](?path=/docs/documentation-types--docs#button).                                        |
| `list`                 | `ContentItem[]`                              | —           | Array of icon-content items (each requires `icon` or `gravityIcon`).                                     |
| `border`               | `'line' \| 'shadow' \| 'none'`               | —           | Card border style.                                                                                       |
| `controlPosition`      | `'content' \| 'footer'`                      | `'content'` | Position of buttons/links inside the card.                                                               |
| `url`                  | `string`                                     | —           | Wraps the whole card in a link.                                                                          |
| `urlTitle`             | `string`                                     | —           | `title` attribute for the card link.                                                                     |
| `target`               | `'_blank' \| '_parent' \| '_top' \| '_self'` | —           | Link target.                                                                                             |
| `icon`                 | `ImageProps`                                 | —           | Leading icon image (URL string, object, or device-aware object).                                         |
| `gravityIcon`          | `GravityIconProps`                           | —           | Leading Gravity UI icon (`string` name, or `{name, color?}` where `color` is `'brand' \| 'text-color'`). |
| `iconPosition`         | `'top' \| 'left'`                            | `'top'`     | Position of the icon relative to the content.                                                            |
| `hoverBackgroundColor` | `string`                                     | —           | _Deprecated._ Background color/gradient applied on hover.                                                |

## Themed values

`icon` and `gravityIcon` accept either a plain value or a `{light, dark}` object resolved against the active runtime theme.

## Storybook

[BasicCard](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-cards-basiccard--docs)

## Card colors

Set these public CSS variables on the site root, a section, or an individual card wrapper.
They apply to BasicCard, BackgroundCard, MediaCard, PriceCard, both PriceDetailed layouts,
ImageCard and Quote. They are CSS settings, not React props or JSON/editor fields.

| Variable                                    | Purpose                                                |
| ------------------------------------------- | ------------------------------------------------------ |
| `--pc-card-background-color`                | Background of `shadow` and `none`; fallback for `line` |
| `--pc-card-background-color-hover`          | Interactive `shadow` and `none` background on hover    |
| `--pc-card-outlined-background-color`       | Background of `line`                                   |
| `--pc-card-outlined-background-color-hover` | Interactive `line` background on hover                 |
| `--pc-card-border-color`                    | Border color of `line`                                 |
| `--pc-card-border-color-hover`              | Interactive `line` border color on hover               |

Fallbacks are resolved on the card (first defined value wins):

| State             | Fallback order                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `shadow` / `none` | `--pc-card-background-color` → `--g-color-base-float`                                                                                       |
| `line`            | `--pc-card-outlined-background-color` → `--pc-card-background-color` → `--g-color-base-float`                                               |
| `shadow` hover    | `--pc-card-background-color-hover` → `--pc-card-background-color` → `--pc-color-base-float-hover`                                           |
| `none` hover      | `--pc-card-background-color-hover` → `--pc-card-background-color` → `--g-color-base-float`                                                  |
| `line` hover      | `--pc-card-outlined-background-color-hover` → `--pc-card-outlined-background-color` → `--pc-card-background-color` → `--g-color-base-float` |
| Border            | `--pc-card-border-color` → `--g-color-line-generic`                                                                                         |
| Border hover      | `--pc-card-border-color-hover` → `--pc-card-border-color` → `--g-color-line-generic`                                                        |

Without these variables the existing light/dark appearance remains unchanged, including
`--pc-color-base-float-hover`. `none` removes the border and shadow, not the background.
Only existing card links gain hover colors; Quote and other non-interactive cards do not.
The outlined variant does not inherit the general hover color.

Values may be CSS colors (HEX, rgb/hsl, `transparent`) or `var(...)`, but not gradients.
Existing individual styling retains priority: ImageCard's `backgroundColor`, Quote's `color`,
BackgroundCard's theme and background layer, PriceCard's background layer, and BasicCard's
legacy `hoverBackgroundColor` gradient overlay retain their behavior. CardLayout's image
container and navigation/UIKit surfaces are outside this API.

### Yandex Cloud example

Place `site-theme` on the same element as `g-root` and the active UIKit theme class.

```css
.site-theme {
  --pc-card-background-color: var(--g-color-base-float);
  --pc-card-background-color-hover: var(--g-color-base-float);
  --pc-card-outlined-background-color: transparent;
  --pc-card-outlined-background-color-hover: transparent;
  --pc-card-border-color: var(--g-color-line-generic);
  --pc-card-border-color-hover: var(--g-color-line-generic);
}

.site-theme.g-root_theme_dark {
  --pc-card-background-color-hover: var(--g-color-base-float-hover);
}
```

This preserves the old `shadow` hover in both themes and makes `line` transparent.
Interactive `none` now also uses the general hover color in dark mode intentionally.

### DataLens and local overrides

For a light DataLens theme, set both general background variables to `#F5F6F7`.
Keep the outlined variables transparent. Provide a separately approved HEX for the dark
class: HEX colors do not change automatically with the theme. A value such as `#25282D`
is only a placeholder, not an approved DataLens dark color.

```css
.special-card-scope {
  --pc-card-background-color: #eaf1ff;
  --pc-card-background-color-hover: #dce7ff;
}
```

A new background stays unchanged on hover if no corresponding hover variable exists
on the card or its ancestors. An inherited hover variable still wins over a locally
changed background; override both to customize both states. Likewise, an inherited
outlined background takes priority over a local general background.
See the **ColorTokens** and **NestedColorFallbacks** stories for examples.
