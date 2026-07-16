# HubspotForm

Embeds a HubSpot form inside a page. Loads the HubSpot scripts on demand and renders the form into a container; emits analytics events on submit and supports default field values and form event handlers.

## Sub-block type

`type: 'hubspot-form'`

## Used in

Accepted as `children` by `CardLayout`, `Slider`, `SliderOld`; also usable inside any block that renders sub-blocks (e.g. `FilterBlock` items).

## Example

```json
{
  "type": "hubspot-form",
  "region": "eu1",
  "portalId": "25764979",
  "formId": "a3eb06a6-e8ce-45d4-81bd-7fadb7dab313"
}
```

## Properties

| Property              | Type             | Default | Description                                                                      |
| --------------------- | ---------------- | ------- | -------------------------------------------------------------------------------- |
| `type` _required_     | `'hubspot-form'` | —       | Sub-block discriminator.                                                         |
| `when`                | `string`         | —       | Conditional rendering expression.                                                |
| `portalId` _required_ | `string`         | —       | HubSpot portal ID.                                                               |
| `formId` _required_   | `string`         | —       | HubSpot form ID.                                                                 |
| `region`              | `string`         | —       | HubSpot region (e.g. `'eu1'`, `'na1'`).                                          |
| `formInstanceId`      | `string`         | —       | Unique instance ID, required to render the same form multiple times on one page. |

Additional runtime-only props (`className`, `theme`, `isMobile`, `formClassName`, `createDOMElement`, `defaultValues`, `onBeforeLoad` / `onBeforeSubmit` / `onSubmit` / `onLoad` / `hubspotEvents`) are available on the React component but are not part of the JSON schema.

## Setup notes

HubSpot forms require the `formsContext` to be configured on `PageConstructorProvider`. The context wires form event handling and any HubSpot-specific runtime configuration; without it, submit analytics and the `onSubmit` / `onBeforeSubmit` / `onLoad` handlers wired through `useHandleHubspotEvents` will not fire. When the form is rendered inside an iframe, set up the `useLoopBackHubspotEvents` hook on the top-level frame so events propagate.

## Themed values

No themed media fields; theme is taken from the active theme context (or the `theme` runtime prop).

## Storybook

[HubspotForm](https://preview.gravity-ui.com/page-constructor/?path=/docs/components-hubspotform--docs)
