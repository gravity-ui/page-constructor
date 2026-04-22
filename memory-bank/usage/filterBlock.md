# FilterBlock Usage

## Overview

`FilterBlock` renders a set of cards that can be filtered by tag. Tags appear as button tabs; selecting a tab shows only the cards associated with that tag.

**File**: `src/blocks/FilterBlock/FilterBlock.tsx`  
**Schema**: `src/blocks/FilterBlock/schema.ts`  
**Type**: `FilterBlockProps` in `src/models/constructor-items/blocks.ts`

---

## Props

| Prop            | Type                             | Required | Description                              |
| --------------- | -------------------------------- | -------- | ---------------------------------------- |
| `tags`          | `FilterTag[]`                    | yes      | List of filter tags shown as tab buttons |
| `items`         | `FilterItem[]`                   | yes      | Cards with their associated tag ids      |
| `title`         | `TitleItemProps \| string`       | no       | Block title                              |
| `description`   | `string`                         | no       | Block subtitle                           |
| `tagButtonSize` | `'s' \| 'm' \| 'l' \| 'xl'`      | no       | Size of tag buttons (default `'l'`)      |
| `allTag`        | `boolean \| string \| FilterTag` | no       | Adds an "all items" tab; see below       |
| `colSizes`      | `GridColumnSizesType`            | no       | Column sizes for card layout             |
| `centered`      | `boolean`                        | no       | Center title/tabs                        |
| `animated`      | `boolean`                        | no       | Wrap in AnimateBlock                     |

### FilterTag

```ts
type FilterTag = {
  id: string;
  label: string;
  analyticsEvent?: AnalyticsEventsProp; // fires when this tab is selected
};
```

### FilterItem

```ts
type FilterItem = {
  tags: string[]; // tag ids this card belongs to
  card: SubBlockModels;
};
```

### allTag variants

| Value                                               | Effect                                  |
| --------------------------------------------------- | --------------------------------------- |
| `true`                                              | "All" tab with default i18n label       |
| `"Custom label"`                                    | "All" tab with custom string label      |
| `{ id: null, label: "...", analyticsEvent: {...} }` | "All" tab with custom label + analytics |

> **Note**: The previous separate `allTagsAnalytics` prop was merged into `allTag`. The object form of `allTag` (which is `FilterTag`) now carries both the label and analytics event.

---

## Analytics

FilterBlock integrates with `useAnalytics`. When a tab is selected:

1. `handleSelectTab(tabId)` is called
2. The matching `ButtonTabsItemProps.analyticsEvent` is looked up
3. `handleAnalytics(event)` fires the event

To attach analytics to a tag, set `analyticsEvent` on the `FilterTag` object. To attach analytics to the "all" tab, use the object form of `allTag`.

```yaml
allTag:
  label: All
  analyticsEvent:
    name: filter-all-clicked
    type: click

tags:
  - id: news
    label: News
    analyticsEvent:
      name: filter-news-clicked
      type: click
  - id: guides
    label: Guides
    analyticsEvent:
      name: filter-guides-clicked
      type: click
```

---

## Minimal JSON Example

```json
{
  "type": "filter-block",
  "tags": [
    {"id": "a", "label": "Category A"},
    {"id": "b", "label": "Category B"}
  ],
  "items": [
    {
      "tags": ["a"],
      "card": {"type": "basic-card", "title": "Card A", "text": "..."}
    },
    {
      "tags": ["b"],
      "card": {"type": "basic-card", "title": "Card B", "text": "..."}
    }
  ],
  "allTag": true
}
```

---

## Internal Implementation Notes

- Tags are mapped to `ButtonTabsItemProps[]` via `useMemo` — both `allTag` (all three forms) and `tags` are unified into one array passed to `ButtonTabs`
- `selectedTag === null` means "show all"; any other value filters `items` by `item.tags.includes(selectedTag)`
- `actualTag` memoization handles the case where `selectedTag` no longer exists in `tabButtons` (e.g., after prop change) — falls back to first tab
