# Changelog

## [1.0.1](https://github.com/gravity-ui/page-constructor/compare/v1.0.0...v1.0.1) (2022-10-03)


### Bug Fixes

* add repository links to readme ([a6ed8b9](https://github.com/gravity-ui/page-constructor/commit/a6ed8b9af5f71e8b0eed3bb52f3309a715c5a48b))

## 1.0.0 (2022-10-03)


### Features

* add blocks translations A-C ([f8d1e76](https://github.com/gravity-ui/page-constructor/commit/f8d1e76cb373b457141a0d4384c2a9a2fb688c30))
* add commitlint ([dfbbf83](https://github.com/gravity-ui/page-constructor/commit/dfbbf83ea435978a1926c3038e965fd48797919f))
* add github workflow ([bd204ec](https://github.com/gravity-ui/page-constructor/commit/bd204eca48c204138ef78c202986683d78a84840))
* add react 18 types supporting ([cd4d1b0](https://github.com/gravity-ui/page-constructor/commit/cd4d1b0f2d075ddcd44adb998bbbeef7fb75117e))
* add translations for blocks ([64e0999](https://github.com/gravity-ui/page-constructor/commit/64e0999ed166a66294b44a81082a00f366e7d53f))
* add translations for components and sub blocks stories ([b8d8125](https://github.com/gravity-ui/page-constructor/commit/b8d8125cf9cab76b225e41159a5613fe75b56416))
* migrate from yandex-cloud to gravity-ui ([3509b63](https://github.com/gravity-ui/page-constructor/commit/3509b63fe1b9507115ff5a3078322dfa39701450))
* **PageConstructor:** add serviceId loadable [CLOUDFRONT-9364] ([#64](https://github.com/gravity-ui/page-constructor/issues/64)) ([4cc16cd](https://github.com/gravity-ui/page-constructor/commit/4cc16cd1a1dcfc0c17d38b92619456b22f3cf078))
* prepare to publishing ([a259f69](https://github.com/gravity-ui/page-constructor/commit/a259f693c581bc34519d73063182c880dfcdb78d))
* translate chapter names ([e922e27](https://github.com/gravity-ui/page-constructor/commit/e922e27657f12aebcd7bb62acb23a783f8a349ba))
* translate components cards urls ([05382bd](https://github.com/gravity-ui/page-constructor/commit/05382bd3038c6aa0fad98bc2270f6869d2b62ca8))
* translate englisht pt.1 ([945423a](https://github.com/gravity-ui/page-constructor/commit/945423a73807fdb0d8f29bba9210f94e6d3185dd))
* translate questions readme ([4da6a8f](https://github.com/gravity-ui/page-constructor/commit/4da6a8fdab85ca68a35a182cd6b841bba6ab3334))
* update hs form CLOUDFRONT-11339 ([478e762](https://github.com/gravity-ui/page-constructor/commit/478e762457cee318e3a9f1e9b27623def80f0603))


### Bug Fixes

* add  postcss-scss ([9d30c31](https://github.com/gravity-ui/page-constructor/commit/9d30c3132dee6809523c2021051328a23ab402be))
* add card-with image schema ([#85](https://github.com/gravity-ui/page-constructor/issues/85)) ([82af438](https://github.com/gravity-ui/page-constructor/commit/82af4382fd9bb37089f3ffc00b4bc8b3ddb36d7a))
* add CHANGELOG and CONTRIBUTING to prettier ignore ([d3def9c](https://github.com/gravity-ui/page-constructor/commit/d3def9c6557f51de330dbcaca64dc56dbc84ce04))
* add dummy test ([9e5e769](https://github.com/gravity-ui/page-constructor/commit/9e5e76901cbd8b3b7b6cac2e757351e58f022bad))
* add paddings to submited message block NOTICKET ([54665d1](https://github.com/gravity-ui/page-constructor/commit/54665d1818f5c63988ae5e5d485a3b10cf5f88ae))
* children types ([dee1176](https://github.com/gravity-ui/page-constructor/commit/dee11769e2058f552e77612450a08790e8c28ba5))
* lint ([3d448fa](https://github.com/gravity-ui/page-constructor/commit/3d448fa879fa20e00e0b9b89ba952ef0b3588184))
* lint fix comand ([5533ab4](https://github.com/gravity-ui/page-constructor/commit/5533ab433aeb2d209913ddeef9364518f84ef882))
* lint prettier ([c57092c](https://github.com/gravity-ui/page-constructor/commit/c57092c9e7c63b5d15a1037598253adc0e578129))
* remove hekpers and sources ([49f9220](https://github.com/gravity-ui/page-constructor/commit/49f9220c094b70e0d86df9552bf6a81e316a3796))
* remove helper decorator ([c512a17](https://github.com/gravity-ui/page-constructor/commit/c512a17abe63be6802e8d6ba82a153e132f8bec7))
* remove withThemeValueContext ([339bbb4](https://github.com/gravity-ui/page-constructor/commit/339bbb418bfb60f82c84e9da0bf0eb6981186dae))
* reword handlers disclamer comments & extend HubspotEventHandlers in HubspotFormProps NOTICKET ([f254205](https://github.com/gravity-ui/page-constructor/commit/f254205a6cf8487a59ed8b3759681e40650760d7))
* storybook launch ([65254de](https://github.com/gravity-ui/page-constructor/commit/65254ded6c23f5f5951e4e8fa18474c0ec154b18))
* turn main readme back to english ([e30267c](https://github.com/gravity-ui/page-constructor/commit/e30267ca710898fd5996341e8315f128c95ca609))

## 1.0.0

- Discontinued support for v1 blocks.

- Deleted the `@yandex-data-ui/common`, `@yandex-data-ui/cloud-schemas`, and `@yandex-data-ui/cloud-components` dependencies.

- Grouped all the constructor elements into blocks and sub-blocks.

- Refactored the PageConstructor component.

- Refactored the validators.

- Moved a project build from `@yandex-data-ui/ui-core` to `gulp`.

- Updated the Storybook.

- Moved to @gravity-ui.

- Added LICENSE and CONTRIBUTING.md.

## 0.60.5

- Added the Content component to the Questions block.

## 0.60.4

- Fixed the bug when text was hidden behind the video in the `HeaderSlider` in Safari.

## 0.60.3

- You can now change the `background` in a dark theme for the BackgroundCard component.

## 0.60.1

- Slowed down slider scrolling.

## 0.60.0

- Removed top and side margins for the `HeaderBlock` with a color background that takes up the entire width.
- Added the fullWidthMedia parameter to the background prop in the `HeaderBlock`.
- Increased the slider arrows in the `HeaderSlider`.

## 0.59.2

- Fixed a bug in the `Share` component.

## 0.59.0

- Increased the width of a color background in the `HeaderBlock`.
- Added a bottom margin in the `HeaderBlock`.
- Removed the common, cloud-components, and cloud-schemas dependencies.

## 0.58.0

- Added a component named BasicCard.

## 0.57.3

- Fixed the margins in the Header block for a mobile if `offset: large`

## 0.57.2

- Fixed the bug in the Slider block with auto-scroll to the first slide.

## 0.57.1

- Reduced the `InfoBlock` width. Added support for rounded corners.

## 0.57.0

- Refactored the Header block. Added a new property named Status. Moved a cube outside a column, it now takes up the entire width.
- Refactored the HeaderSlider block.

## 0.56.0

- Increased side margins for the mobile version to 24px.

## 0.55.0

- Added YAML snippets to the storybook.

## 0.53.1

- Changed the hover effect in cards.

## 0.53.2

- Fixed the hover behavior in the `Share` component.
- Moved the ui-kit to dev-dependencies.

## 0.53.1

- Added support for the gray color in the `Content` component lists.

## 0.53.1

- Added a component named `HubspotForm`.

## 0.52.0

- Upgraded i18n to 0.6.0. Now, before using the page-constructor, you need to call 'configure' (for details, see the readme file).

## 0.51.0

- You can now use `*.webp` as `src` for `<Image />`.

## 0.50.0

- Updated the tsconfig.

## 0.49.1

- Removed CSS variables with --www-...

## 0.49.0

- Added the customFormOrigin parameter to the YandexForm component.

## 0.48.0

- Fixed the controls display in the storybook.

## 0.46.0

- Updated the stories.

## 0.44.0

- Updated the eslint, stylelint, and prettier configs.

## 0.43.1

- Fixed the bug with an unnecessary offset of a slide in the slider.

## 0.43.0

- Added the Content cube to the MediaBlock.

## 0.42.4

- Fixed the VideoBlock and ReactPlayer component semantic colors.
- Fixed the label mixin font.

## 0.42.3

- Removed --yc-text-caption-1 font overriding and replaced it with --yc-text-caption-2.

## 0.42.2

- Fixed the component semantic colors.

## 0.42.0

- Removed the TextTable block.

## 0.40.0

- Set the `--yc-text-accent-font-weight` CSS variable to 500.
- Removed the top margin of the Button component.
- Added mixins for headers.
- Added the `--pc-text-header-color` variable set to `var(--yc-color-text-primary)`.
- Upgraded the @gravity-ui/uikit version to 2.3.0.

## 0.39.2

- Fixed the video and image display in the BackgroundMedia component in the mobile version.

## 0.39.1

- Fixed some slider bugs.

## 0.38.0

- You can now send metrics and pixels from the YandexForm component context.

## 0.36.1

- Fixed the footnotes in Safari.

## 0.36.0

- Added handling of missing blocks.

## 0.35.0

- Added YFM styles to support the dark theme and font-family via a variable.

## 0.34.0

### Breaking changes

- Added the `@gravity-ui/uikit` package.
- Updated the `@yandex-data-ui/common` package.
- Replaced the peer dependencies package: `@yandex-data-ui/i18n` -> `@gravity-ui/i18n`.
- Removed the react-router-dom package from the dependencies.

## 0.33.0

Removed the `HeaderWithImage` component.

## 0.32.0

Added dark theme support in the `companies-block`.

## 0.30.1

Fix content-layout text color in dark theme

## 0.30.0

Added YFM handling in the `PreviewBlock`.

## 0.29.0

Added descriptions of blocks and components, a CHANGELOG, and a project description to the storybook.

## 0.28.2

Fixed a link in the `ExtendedFeatures` block.

## 0.28.0

Added styles for links inserted using a markup.

## 0.24.0

Added all blocks and components to the storybook.

## 0.23.0

Added a component named `Quote`.

## 0.22.1

Removed the `!important` statement in the `BlockBase` for the padding-bottom property
In the `Content`, if the `text` block has no `title`, the `margin-top` property is 0.

## 0.22.0

### Breaking changes

- `PageConstructorProvider` is now a separate component. For the `PageConstructor` to run properly, wrap it in this provider.
  For details, see the [readme](https://github.yandex-team.ru/data-ui/page-constructor/blob/master/README.md#начало-работы) file.

- Deleted the `system` theme (the `light` theme is used instead by default).

- Changed the default values of the `muted` and `autoplay` parameters in the `ReactPlayer` component from `true` to `false`.

## 0.21.0

- Added a content cube, card fill, and themes to the `background-card`.

## 0.20.1

- Fixed YFM text formatting in the `content-layout-block`.

## 0.20.0

- Added a content cube to the `card-with-image`.

## 0.19.3

- Added a rerender fix in the `media-block`.

## 0.19.1

- Added a slider fix in the `media-block`.

## 0.19.0

- Added a DataLens iframe to the `media-block`.

## 0.18.4

- Fixed the `BlockHeader` margins.

## 0.18.3

- Added a fix for `footnotes`.

## 0.17.4

- Added a fix for image rounding in the `FullScreenImage` component.

## 0.17.3

- Added a fix for the `content-layout-block`, the default width is `m`.

## 0.17.2

- Fixed the heading1 mixin.

## 0.17.1

- Added a YFM fix for null values.

## 0.17.0

- Added a block named `content-layout-block`.

## 0.11.1

- Removed the `cards-with-image-block`. Instead, use the
  `cards-layout-block` that is universal for all cards.

## 0.11.0

- Added dark theme support in blocks.

## 0.10.1

- Fixed imports in the HeaderBreadcrumbs component.

## 0.10.0

- Added the breadcrumbs property to the Header component.

## 0.9.0

- Added the CardLayout block, the BackgroundCard component.

## 0.7.1

- Added the isoDate property to the NewsCard component.

## 0.7.0

- Added the HeaderSlider block.
- Fixed the caption bug in the Tabs block.

## 0.6.4

- Fixed the Icons block links.

## 0.6.3

- Fixed the shadow color of Slider arrows and cards.

## 0.6.0

- Added the Icons and Header blocks.
- Added the NewsCard component.
- Updated the CardsWithImage block with fullscreen support added.

## 0.5.1

- Fixed Title size L fonts.
- Removed padding-bottom for the HeaderBlock content in the mobile version.

## 0.5.0

- Added style redesign.

## 0.3.5

- Added the Header block.

## 0.3.3

- Fixed the Title component animation, added the right margin to correctly break the title.

## 0.1.4

- Moved globally defined styles to components.

## 0.1.1

- Fixed offsets from an image in the cards-with-image.

## 0.1.0

- Added a block with photos: cards-with-image.

## 0.0.10

- Added style fixes for the banner dark theme.

## 0.0.8

- Added YFM style fixes and updates for components from cloud-www.

## 0.0.5

- Added a mixin for setting style specificity. Fixed errors related to style activation order.

## 0.0.4

- Fixed the margins of nested grids.

## 0.0.3

- Added a grid column property that allows resetting the margins.

## 0.0.2

- Added style variables for fonts. Fixed the `PageConstructor` component class.

## 0.0.1

- Added page constructor version 1.
