`type: "title"`

`title:`

- `text: string` - Title text

- `textSize?: 's' | 'm' | 'l'` — Title font size

- `url?: string` — URL for a redirect on clicking the title, an arrow is automatically added at the end.

- `resetMargin?: boolean` - default `true`. Without this property `margin-top` will be proportional to `textSize` (see section _Margins_ below)

- `analyticsEvents?: AnalyticsEventsBase` - Analytics events to track click

`description: string` - text (with YFM support)

**Margins for title without reset:**

`textSize s - top: m`

`textSize m - top: l`

`textSize l - top: xl`
