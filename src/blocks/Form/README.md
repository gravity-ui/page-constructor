# Form

A two-column block that renders a third-party form (Yandex Forms or HubSpot) alongside optional YFM text content, with a configurable layout direction and background.

## Block type

`type: 'form-block'`

## When to use

- You need to embed a Yandex Form or HubSpot form into a page assembled from JSON.
- You want to place marketing copy, title, and links next to a lead-generation form.
- You need a themed background (color or image) behind the form.

## Example

```json
{
  "type": "form-block",
  "title": "Hubspot form",
  "direction": "center",
  "textContent": {
    "title": "Lorem ipsum dolor sit amet",
    "text": "**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  "formData": {
    "hubspot": {
      "region": "eu1",
      "portalId": "25764979",
      "formId": "a3eb06a6-e8ce-45d4-81bd-7fadb7dab313"
    }
  }
}
```

A Yandex form variant:

```json
{
  "type": "form-block",
  "formData": {
    "yandex": {
      "id": "5f3c4d2b1e2a4c0001a2b3c4"
    }
  }
}
```

## Properties

| Property              | Type                                                                                       | Default    | Description                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------- |
| `formData` _required_ | `{yandex?: YandexFormProps \| {light, dark}, hubspot?: HubspotFormProps \| {light, dark}}` | —          | The form to embed. Exactly one of `yandex` or `hubspot` is expected.                     |
| `title`               | `string`                                                                                   | —          | Block title rendered above the form.                                                     |
| `textContent`         | `ContentBase` (without `size`, `centered`, `colSizes`)                                     | —          | Title, text (YFM), links, buttons, list items for the content column.                    |
| `direction`           | `'content-form' \| 'form-content' \| 'center'`                                             | `'center'` | Layout direction of the content column relative to the form.                             |
| `background`          | `ImageProps`                                                                               | —          | Background image or CSS style; `style` supports `{desktop, mobile}` breakpoints. Themed. |

### `formData.yandex` (YandexFormProps)

| Property        | Type     | Default | Description                                      |
| --------------- | -------- | ------- | ------------------------------------------------ |
| `id` _required_ | `string` | —       | Yandex Forms form id.                            |
| `containerId`   | `string` | —       | Optional DOM container id for the embedded form. |

### `formData.hubspot` (HubspotFormProps)

| Property              | Type     | Default | Description                        |
| --------------------- | -------- | ------- | ---------------------------------- |
| `portalId` _required_ | `string` | —       | HubSpot portal id.                 |
| `formId` _required_   | `string` | —       | HubSpot form id.                   |
| `region`              | `string` | —       | HubSpot region (e.g. `'eu1'`).     |
| `formInstanceId`      | `string` | —       | Optional HubSpot form instance id. |

### Common properties

Inherits: `anchor`, `visible`, `indent`, `qa`, `className`, `animated`, `theme`, `when`, `context`. See root README.

## Setup notes

HubSpot forms are loaded through the HubSpot embed script automatically; no extra provider configuration is required. Yandex Forms are loaded via the Yandex Forms script. If you use a custom React node instead of `formData`, pass it via the `customFormNode` / `additionalContentNode` props when mounting the block from code (not available from JSON).

## Themed values

`background`, `formData.yandex`, and `formData.hubspot` accept either a plain value or `{light, dark}`.

## Storybook

[Form](https://preview.gravity-ui.com/page-constructor/?path=/docs/blocks-form-block--docs)
