`type: "hubspot-form"`

`className?: string` — Form wrap class

`theme?: string`

`isMobile?: true | false`

`region?: string`

`portalId: string`

`formId: string`

`formInstanceId?: string` — Unique ID within a page to make the same form run on the same page multiple times.

`formClassName?: string` — Form class

`hubspotEvents: string[]` — An array of hubspot events

`createDOMElement?` - If you put `true`, then a container will be created using `document.createElement` to insert the hubspot form. Default `false`

[Form global events:](https://legacydocs.hubspot.com/global-form-events)

`onBeforeLoadForNonIFrameForm?` - onBeforeFormInit

`onBeforeSubmitForNonIFrameForm?` - onFormSubmit

`onSubmitForNonIFrameForm?` - onFormSubmitted

`onLoadForNonIFrameForm?` - onFormReady
