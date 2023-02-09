`type: "hubspot-form"`

`className?: string` — Form wrap class

`theme?: string`

`isMobile?: true | false`

`region?: string`

`portalId: string`

`formId: string`

`formInstanceId?: string` — Unique ID within a page to make the same form run on the same page multiple times.

`formClassName?: string` — Form class

`pixelEvents: PixelEvent[]` — Goals for Facebook pixel

`hubspotEvents: string[]` — An array of hubspot events

`inVirtualDom?` - If `false`, a container will be created for inserting the form via document.createElement. Default `true`

[Form global events:](https://legacydocs.hubspot.com/global-form-events)

`onBeforeLoadForNonIFrameForm?` - onBeforeFormInit

`onBeforeSubmitForNonIFrameForm?` - onFormSubmit

`onSubmitForNonIFrameForm?` - onFormSubmitted

`onLoadForNonIFrameForm?` - onFormReady
