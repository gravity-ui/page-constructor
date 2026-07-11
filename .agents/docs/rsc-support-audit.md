# RSC support — аудит и спайк сборки (S1 + S2)

> Подготовка `@gravity-ui/page-constructor` к работе с React Server Components (Next.js 14 App Router, React 18).
> Документ фиксирует результаты двух исследовательских задач: **S1** — классификация модулей (client vs server-safe), **S2** — проверка, что директива `'use client'` переживает сборку.

## Контекст

React 18 **как версия уже поддержан** — в `peerDependencies` стоит
`react: "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"`.

Реальная задача — **совместимость с RSC**: сейчас в `src/` **ноль** директив `'use client'`, а библиотека построена на `createContext` (17 модулей), хуках (108 файлов) и обработчиках событий. Любой импорт `PageConstructor` в серверный компонент падает, потому что React по умолчанию считает каждый модуль без `'use client'` серверным.

**Цель:** расставить границы `'use client'` так, чтобы серверный компонент мог импортировать `PageConstructor`/`PageConstructorProvider` «из коробки», при этом `/server` остаётся серверным, а `models`/`schema`/`utils` — импортируемыми из серверного кода.

---

## S2 — Вердикт по сборке ✅

**`'use client'` переживает сборку без изменений в тулинге. Фикс не требуется.**

TypeScript распознаёт ведущий строковый литерал `'use client';` как **directive prologue** и сохраняет его первой инструкцией модуля во всём выводе — даже поднимая выше авто-инжектнутого `react/jsx-runtime` import и выше `"use strict"` в CJS. Кастомные трансформеры (`transformScssImports`, `transformLocalModules`) и шаги `replace`/sourcemaps в gulp директиву не трогают.

### Доказательства (первые строки артефактов)

```js
// build/esm/context/theme/ThemeContext.js
'use client';
import * as React from 'react';
import {DEFAULT_THEME} from '../../components/constants.js';
```

```js
// build/cjs/context/theme/ThemeContext.js
'use client';
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
```

```js
// build/esm/components/Button/Button.js
// (директива остаётся выше авто-инжектнутого jsx-runtime import)
'use client';
import {jsx as _jsx, jsxs as _jsxs} from 'react/jsx-runtime';
import * as React from 'react';
```

### Ключевые находки

- **esm:** `'use client'` — строка 1, до всех импортов. ✅
- **cjs:** `'use client'` — строка 1, выше инжектнутого `"use strict"` и всех `require()`. ✅ Это ровно то, что требует RSC.
- **esm vs cjs:** различие только в том, что cjs добавляет `"use strict"` второй директивой; в обоих `'use client'` остаётся первой. Для RSC разницы в поведении нет.

### Команда и время

- Быстрый путь: `npx gulp compile-to-esm compile-to-cjs` (только TS-компиляция, параллельно) — **~10 c**.
- Полный `npm run build:client` дополнительно делает clean, бандл swiper, копирование деклараций/json и sass — на `.js`-директиву не влияет.

### Рекомендации при массовой расстановке

1. Директива должна быть **голым строковым литералом на первой строке** (до любого импорта). Лицензионный коммент-баннер сверху не мешает (комментарии — не инструкции), но любой код/импорт до директивы её сломает.
2. «Ремни безопасности» не нужны, но при желании `createTypescriptProject` даёт хук `customTransformers` (уже используется для `before`/`afterDeclarations`) — туда можно добавить `before`-трансформер, инжектящий directive prologue. Эмпирически это избыточно.

---

## S1 — Вердикт по классификации модулей

Критерий: «использует ли **сам модуль** клиентскую фичу — хуки, `createContext`, `<Context.Provider>`, события, браузерные глобалы, интерактивные виджеты, классовые компоненты?». Модуль без таких фич импорт-безопасен из серверного компонента, даже если рендерит клиентских детей.

Область: исключены `__tests__`, `__stories__`, `src/stories/`, `*.scss`, `src/widget/`.

### Сводка

| Вердикт                                | Кол-во (≈) | Где                                                                                                                                                                                                         |
| -------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CLIENT** (нужен `'use client'`)      | ~190       | весь `src/context`, весь `src/hooks`, весь `src/editor`, `src/customization`, и ~119 из ~194 impl-файлов в `blocks`/`sub-blocks`/`components`/`containers`/`grid`/`navigation`                              |
| **SERVER-SAFE** (импорт без директивы) | ~110       | весь `src/models`, `src/schema`, `src/text-transform`, `src/server.ts`, `src/constants.ts`, весь `src/utils`, все `i18n`-кейсеты, все per-component `schema.ts`, плюс ~75 презентационных/барел/util-файлов |
| **BORDERLINE** (помечены)              | 6 групп    | `utils/common.ts`, `utils/hubspot.ts`, value-импорты uikit в `models`, корневые барелы `index.ts` + `constructor-items.ts`, side-effect импорты в `i18n`                                                    |

### Разбор по директориям

| Директория                              | Вердикт                       | Заметки                                                                                                                                                                           |
| --------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/context/*`                         | **CLIENT** (без исключений)   | каждый вызывает `createContext` и/или экспортит хуки; `theme/withTheme.tsx` — классовый компонент                                                                                 |
| `src/hooks/*`                           | **CLIENT** (blanket)          | все зовут хуки/браузерные глобалы; `useMetrika.ts` и `index.ts` — ре-экспорты, но осмысленны только внутри клиента                                                                |
| `src/editor/*`                          | **CLIENT** (blanket)          | Monaco, `@gravity-ui/dynamic-forms`, store, `ErrorBoundary` (class). Отдельный вход `./editor`, не для сервера                                                                    |
| `src/models/*`                          | **SERVER-SAFE** (blanket)     | чистые типы/энамы/guards. См. риск #2 про value-импорты uikit                                                                                                                     |
| `src/schema/*`                          | **SERVER-SAFE** (blanket)     | чистый JSON Schema, включая каждый per-block/-component `schema.ts`                                                                                                               |
| `src/text-transform/*`                  | **SERVER-SAFE** (blanket)     | изоморфно: `@diplodoc/transform`, `sanitize-html`, `typograf`, `lodash`                                                                                                           |
| `src/server.ts`                         | **SERVER-SAFE / server-only** | единственная строка `export * from './text-transform'`; держать серверным                                                                                                         |
| `src/constants.ts`                      | **SERVER-SAFE**               | плоские константы (`BREAKPOINTS` и т.п.)                                                                                                                                          |
| `src/utils/*`                           | **SERVER-SAFE**               | все импорт-безопасны; `common.ts` (`loadScript` трогает `document`) и `hubspot.ts` (`window`) — только внутри тел функций                                                         |
| `src/grid/*`                            | **в основном SERVER-SAFE**    | `Grid`, `Col`, `Break`, `types`, `utils` — server-safe. **Исключение: `Row/Row.tsx` = CLIENT** (хуки)                                                                             |
| `src/customization/BlockDecoration.tsx` | **CLIENT**                    | `React.useContext(InnerContext)`                                                                                                                                                  |
| `src/blocks/*`                          | **преимущественно CLIENT**    | server-safe листья: `Banner/Banner.tsx`, `Map/Map.tsx`, `Tabs/TabsTextContent`, `Footer/.../DisclaimerFloor`, + чистые `*/utils.ts`, `*/models.ts`, `blocks/validators.ts`, барел |
| `src/sub-blocks/*`                      | **смешанно**                  | см. списки ниже                                                                                                                                                                   |
| `src/components/*`                      | **смешанно**                  | см. списки ниже                                                                                                                                                                   |
| `src/containers/*`                      | **CLIENT-ядро**               | server-safe только `ConstructorRow/ConstructorRow.tsx` и барелы                                                                                                                   |
| `src/navigation/*`                      | **преимущественно CLIENT**    | server-safe: `NavigationList`, `NavigationPopup`, `SocialIcon`, `Standalone`, `containers/Layout/Layout.tsx`, `utils.ts`, `models.ts`, `schema`, барелы                           |

### Server-safe модули (можно импортировать в серверный компонент уже сегодня)

- **Целые директории:** `src/models/**`, `src/schema/**` (вкл. каждый `schema.ts`), `src/text-transform/**`.
- **Отдельные файлы:** `src/server.ts`, `src/constants.ts`, весь `src/utils/**` (13 файлов), все `i18n/index.ts` кейсеты.
- **Презентационные листья** (импорт-безопасны, рендерят клиентских детей):
  - grid: `Grid.tsx`, `Col.tsx`, `Break.tsx`;
  - blocks: `Banner/Banner.tsx`, `Map/Map.tsx`, `Tabs/TabsTextContent/TabsTextContent.tsx`;
  - sub-blocks: `Content`, `Divider`, `MediaCard`, `PriceCard`, `PriceDetailed` (+ `SeparatePriceDetailed`, `PriceDetails/Details/List`, `Settings`);
  - components: `Anchor`, `Author`, `BackgroundImage`, `BlockBase`, `Buttons`, `ContentList`, `Icon`, `IconWrapper`, `Links`, `MetaInfo`, `Title/Title.tsx`, `ToggleArrow`, `UnpublishedLabel`, `YFMWrapper`, `Media/Iframe/Iframe.tsx`, `Media/FullscreenVideo/FullscreenVideo.tsx`, `MediaBase/MediaBaseContent.tsx`;
  - containers: `.../ConstructorRow/ConstructorRow.tsx`;
  - navigation: `NavigationList`, `NavigationPopup`, `SocialIcon`, `Standalone`, `containers/Layout/Layout.tsx`.

> **Оговорка:** эти листья импорт-безопасны на сервере, но в рантайме почти всегда живут внутри клиентского поддерева `PageConstructor` и полагаются на провайдеры — на практике они рендерятся ниже клиентской границы.

### Must be client (по зонам)

- **Все контексты** — `src/context/**` (`createContext` + хуки).
- **Все хуки** — `src/hooks/**`.
- **Провайдер/движок** — `containers/PageConstructor/Provider.tsx`, `PageConstructor.tsx`, `ConstructorBlock/Blocks/Item/Loadable`, `Loadable/Loadable.tsx`.
- **Интерактивные виджеты** — `blocks/Slider` (Swiper), `blocks/SliderOld` (react-slick), `components/ReactPlayer/*`, `components/Media/Video`, `components/VideoBlock`, `components/Map/*` (+ `YMap/*`) и `context/mapsContext`, `sub-blocks/HubspotForm/*`, `components/YandexForm`, `components/InnerForm` (dynamic-forms), весь `src/editor/**` (Monaco).
- **Компоненты с хуками/событиями/браузерными API** — CLIENT-списки в `blocks`, `sub-blocks`, `components`, `navigation` + `customization/BlockDecoration.tsx`.
- **Классовые компоненты** — `context/theme/withTheme.tsx`, `components/Table/Table.tsx`, `components/OutsideClick`, `components/OverflowScroller`, `components/FullWidthBackground`, editor `ErrorBoundary`.
- **Рендерят `<Context.Provider>` (client, несмотря на отсутствие хуков)** — `containers/PageConstructor/Provider.tsx`, `containers/.../ConstructorItem.tsx`, `ConstructorLoadable.tsx`, `navigation/.../NavigationItem.tsx`, `navigation/.../NavigationButton/NavigationButton.tsx`, `grid/Row/Row.tsx`.

#### Client-листья: sub-blocks

`BackgroundCard`, `BannerCard`, `BasicCard`, `HubspotForm/*`, `ImageCard`, `LayoutItem/LayoutItem.tsx`, `Quote/Quote.tsx`, `PriceDetailed/CombinedPriceDetailed`, `PriceDetailed/PriceDescription`, `PriceDetailed/PriceDetails/PriceDetails.tsx`.

#### Client-листья: components

`AnimateBlock`, `BackLink`, `BackgroundMedia`, `BalancedMasonry`, `Button`, `ButtonTabs`, `DefaultVideo`, `FileLink`, `Foldable`, `FullWidthBackground` (class), `FullscreenImage`, `FullscreenMedia`, `HTML`, `HeaderBreadcrumbs`, `Image/Image.tsx`, `ImageBase`, `InnerForm`, `Link`, `Map/*` (GoogleMap, YandexMap, YMap), `Media/DataLens`, `Media/Media.tsx`, `Media/Image/Image.tsx`, `Media/Video/Video.tsx`, `MediaBase/MediaBase.tsx`, `OutsideClick` (class), `OverflowScroller` (class), `ReactPlayer/*`, `Table/Table.tsx` (class), `Title/TitleItem.tsx`, `VideoBlock`, `YandexForm`, `RouterLink`.

### Риски / сюрпризы

1. **Client-без-хуков легко пропустить.** `Provider.tsx`, `NavigationButton.tsx`, `ConstructorItem.tsx`, `grid/Row/Row.tsx` не используют хуки, но обязаны быть клиентскими, потому что `<Context.Provider>` нельзя создать в серверном компоненте. Grep «есть хук → client» их **пропустит** — нужен доп. критерий «рендерит `.Provider`».
2. **`models` тянут `@gravity-ui/uikit` через value-import.** `models/constructor-items/common.ts` и `blocks.ts` делают `import {ButtonView, IconData, ButtonProps, ButtonSize} from '@gravity-ui/uikit'` (не `import type`). Это только типы, но без `import type` бандлер может затащить клиентский uikit в server-safe граф `models`. **Фикс:** перевести на `import type`. (`constructor-items/common.ts` также делает `import * as icons from '@gravity-ui/icons'` — чистые данные, безопасно.)
3. **Корневые барелы смешанные.** `src/index.ts` ре-экспортит контексты/PageConstructor/blocks (client) вместе с `models`/`schema`/`utils`/`constants` (server-safe); `src/constructor-items.ts` мапит типы блоков на клиентские компоненты. Импорт «из корня» в серверном компоненте транзитивно тянет клиент. **Директиву на барелы не ставить;** отдельно решить — добавлять ли subpath-экспорты (`./models`, `./utils`), т.к. сейчас в `exports` их нет.
4. **`server.ts` чистый** — ре-экспортит только `text-transform` (изоморфно). Держать изолированным.
5. **`utils/common.ts` и `utils/hubspot.ts`** трогают `document`/`window` только внутри тел функций — импорт-безопасны, но по сути клиентские рантайм-хелперы. Не «повышать» их до общих серверных утилит.
6. **`i18n`-кейсеты выполняют side-effect при импорте** (`addComponentKeysets`). Изоморфно и безопасно, но регистрация исполняется и на сервере — это не нулевой по стоимости импорт типов.

---

## Итог и следующий шаг

- **Тулинг сборки готов** (S2): достаточно ставить `'use client';` первой строкой исходника.
- **Карта границ есть** (S1): помечаем директивой только настоящие клиентские модули (вкл. рендерящие `<Provider>` без хуков), чистые слои оставляем server-safe. Это канонический RSC-паттерн и даёт «работает из коробки».
- **Перед массовой правкой** — решить две развилки: (а) гранулярность (листья vs под-барелы; рекомендуется листья); (б) добавлять ли subpath-экспорты для серверных модулей. Плюс точечный фикс `import type` в `models` (риск #2).

Следующие задачи плана: **S3/S4** — расстановка `'use client'`; **S5** — editor + проверка чистоты `/server`; **S6** — eslint-правило + build-assert; **S7** — Next.js 14 пример; **S8** — доки/релиз.

---

## План развития (S3–S9)

Ниже — продолжение плана после исследовательских S1/S2. Стратегия по умолчанию: **точечная граница** (`'use client'` только на настоящих клиентских листьях + на модулях, рендерящих `<Provider>`), барелы и чистые слои — без директивы.

### Фазы

| Фаза                        | Что                                                                                         | Статус          |
| --------------------------- | ------------------------------------------------------------------------------------------- | --------------- |
| **0. Спайк сборки**         | Доказать, что `'use client'` переживает gulp-компиляцию (esm+cjs) и остаётся первой строкой | ✅ сделано (S2) |
| **1. Карта границ**         | Классифицировать каждый модуль client vs server-safe                                        | ✅ сделано (S1) |
| **2. Расстановка директив** | `'use client'` по списку: ядро + периферия                                                  | S3, S4          |
| **3. Защита пайплайна**     | Eslint-правило + build-assert тест на артефакты                                             | S6              |
| **4. Пример + верификация** | Next.js 14 App Router: серверный компонент рендерит `PageConstructor` — критерий успеха     | S7              |
| **5. Доки и релиз**         | README/migration, changelog, semver (minor/feat)                                            | S8              |
| **6. blog-constructor**     | Бамп зависимости + то же самое в отдельном репозитории                                      | S9              |

### Субагенты

Порядок: **S3/S4** — основная правка (в worktree, чтобы не мешать друг другу и main). **S5–S8** — после расстановки. **S9** — отдельный репозиторий.

| #      | Субагент                     | Задача                                                                                                                                                                                                                        | Зависит от |
| ------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **S3** | `general-purpose` (worktree) | **Ядро.** `'use client'` в `Provider.tsx`, `PageConstructor.tsx`, всём `src/context/*`, `src/hooks/*`, `src/containers/*`, `src/grid/Row/Row.tsx`. Прогнать `typecheck`.                                                      | S1, S2     |
| **S4** | `general-purpose` (worktree) | **Периферия.** `'use client'` в клиентских листьях `blocks`, `sub-blocks`, `components`, `navigation/*` (по спискам «Must be client» выше). Чистые презентационные листья не трогать.                                         | S1, S2     |
| **S5** | `general-purpose`            | **Editor + чистота `server`.** Директива на границе `/editor`; проверить, что `src/server.ts` и весь `/server`-граф остались **без** директив и не тянут клиентские модули. Точечный фикс `import type` в `models` (риск #2). | S1         |
| **S6** | `test-writer`                | **Guardrails.** Eslint-правило (обязательность директивы на клиентских зонах, запрет на `src/server.ts`/чистых утилях) + jest/скрипт-ассерт, грепающий `build/esm` и `build/cjs` на директиву в ключевых файлах.              | S2, S3, S4 |
| **S7** | `general-purpose`            | **Next.js 14 пример + верификация.** App-Router приложение: серверный компонент рендерит `PageConstructor`, контент — через server action. Подтвердить рендер без ошибок RSC.                                                 | S3, S4     |
| **S8** | `doc-writer`                 | **Доки/релиз.** Раздел про RSC в README, migration-заметка, changelog.                                                                                                                                                        | S3, S4, S7 |
| **S9** | отдельный репозиторий        | **blog-constructor.** Бамп `page-constructor` + `'use client'` для собственных компонентов blog-constructor + свой Next-пример. Из этого воркспейса недоступно — параллельный поток.                                          | S3–S8      |

### Открытые развилки (решить перед S3/S4)

1. **Гранулярность границы:** листья (рекомендуется) vs под-барелы (`blocks/index.ts` и т.п.). Листья = канонический RSC-паттерн, лучший tree-shaking; под-барелы проще, но затягивают презентационные листья в клиентский граф.
2. **Subpath-экспорты для серверных модулей:** добавлять ли `./models`, `./utils`, `./schema-ts` в `package.json#exports`, чтобы серверные компоненты импортировали типы/утилиты без пересечения клиентской границы. Сейчас их нет — импорт «из корня» тянет клиент.

### Риски

- **Client-без-хуков** (`Provider.tsx`, `NavigationButton`, `ConstructorItem`, `grid/Row/Row.tsx`) — grep по хукам их пропустит; в S3/S4 использовать доп. критерий «рендерит `<Context.Provider>`».
- **CJS-артефакт:** `'use client'` в CJS безвреден (Next смотрит на ESM), но проверить в S6.
- **Загружаемые блоки** (`Loadable`, `Map`, формы, `React.lazy`) — убедиться, что граница не рвёт динамическую загрузку (S3/S7).
- **`SSRContext`/`useMount`** — логика «isServer» должна остаться консистентной внутри клиентской границы.

---

## План работ — 2 этапа (актуальный, с разбивкой на субагентов)

> Реконсиляция S-плана под целевую двухэтапную рамку:
> **Этап 1 = «встраивается в Next.js без костылей»** (бывшие S3–S8) — обязательный, разблокирует тикет.
> **Этап 2 = «сдвигаем компоненты в RSC, где реально»** (бывшая Фаза 7) — опциональная оптимизация, требует согласования инварианта #8.
> Списки конкретных модулей не дублируются — берутся из разделов **S1** («Must be client», «Server-safe модули») и **Фаза 7** («Карта контекстов»).

### Этап 1 — граница `'use client'`, работает из коробки

**Критерий приёмки этапа:** на smoke-проекте `page-constructor-next-rsc` `npm run build` проходит **без** `Failed to collect page data`; консюмер не пишет ни одной обёртки. Стратегия — точечная граница (листья + модули, рендерящие `<Provider>`), барелы и чистые слои без директивы.

| Шаг                                          | Субагент                       | Задача                                                                                                                                                                                                                                                             | Зависит от   | Критерий шага                                                                                 |
| -------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | --------------------------------------------------------------------------------------------- |
| **1.1 Ядро**                                 | `general-purpose` (worktree A) | `'use client'` на `context/**`, `hooks/**`, `containers/**`, `grid/Row/Row.tsx`, `Provider.tsx`, `PageConstructor.tsx`. Критерий отбора: хук **или** рендер `<Provider>`. Прогнать `typecheck`                                                                     | S1, S2       | E1 уходит; `typecheck` зелёный                                                                |
| **1.2 Периферия**                            | `general-purpose` (worktree B) | `'use client'` на клиентских листьях `blocks`/`sub-blocks`/`components`/`navigation` (по client-спискам S1). Чистые презентационные листья не трогать                                                                                                              | S1, S2       | сборка не падает на блоках                                                                    |
| **1.3 Editor + чистота `/server` + exports** | `general-purpose`              | Директива на входе `./editor`; проверить, что `server.ts` и весь `/server`-граф **без** директив; фикс `import type` в `models/constructor-items/{common,blocks}.ts` (риск #2); добавить `./models`, `./utils` в `package.json#exports` (развилка 2 — решена «да») | S1           | grep `/server`-графа чист; `models` без value-import uikit; новые subpath-экспорты резолвятся |
| **1.4 Guardrails**                           | `test-writer`                  | Eslint-правило (обязательность директивы в клиентских зонах + запрет на `server.ts`/чистых утилях) + build-assert тест: греп `build/esm`+`build/cjs` на директиву в ключевых файлах                                                                                | 1.1, 1.2, S2 | тест краснеет, если директиву сняли/срезали                                                   |
| **1.5 Verify**                               | `general-purpose`              | Пересобрать `npm pack` → поставить tarball в smoke-проект → `next build` (цикл ретеста из раздела «Верификационный проект»)                                                                                                                                        | 1.1–1.3      | build проходит, `/` рендерится на сервере                                                     |
| **1.6 Доки/релиз**                           | `doc-writer`                   | Раздел RSC в README + migration-заметка + changelog (**minor / feat**)                                                                                                                                                                                             | 1.5          | релиз-нота готова                                                                             |

**Фан-аут Этапа 1:** шаги **1.1 и 1.2 запускаются параллельно** в разных worktree — они правят непересекающиеся директории (ядро vs периферия). 1.3 может идти параллельно 1.1/1.2 (директории `editor`/`server`/`models` disjoint), но фикс `import type` в `models` должен приземлиться до 1.5. 1.4 — только после 1.1+1.2 (нужны расставленные директивы для ассертов). 1.5 сводит все worktree воедино. 1.6 — после зелёного 1.5.

### Этап 2 — рост серверной доли (инверсия `context → props`)

**Критерий приёмки этапа:** First Load JS страницы из статических блоков падает (`next build` до/после), интерактив цел (острова), нет hydration mismatch, `playwright` зелёный.
**Механика (без костылей):** ставим на Рычаг 2 (инверсия `context → props`), изоморфный шим (Рычаг 1) — не используем. Читаем server-резолвимые контексты один раз на клиентской границе, раздаём пропами; листья становятся server.

| Шаг                         | Субагент                                             | Задача                                                                                                                                                                                                                                                  | Зависит от       |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **2.0 Baseline**            | `general-purpose`                                    | Зафиксировать First Load JS на странице из статических блоков (`next build`)                                                                                                                                                                            | Этап 1 зарелижен |
| **2.1 Отбор кандидатов**    | `Explore`                                            | Статичные листья, читающие только server-резолвимые контексты (`theme`/`locale`/`isMobile`/`ssr`/`projectSettings` — колонка «да» карты контекстов). Кандидаты: `Content`, `Title`, `Banner`, карточки                                                  | 2.0              |
| **2.2–2.4 Конверсия блока** | `general-purpose` (worktree, **один агент на блок**) | Ввести server-shell (резолв контекстов на границе); в листе убрать `useTheme`/`useContext`, принять `theme`/`locale` пропами, снять `'use client'`; `getThemedValue(x, theme)` без изменений. Проверить: интерактив-острова целы, нет mismatch, JS упал | 2.1              |
| **2.5 Итерация/замер**      | `general-purpose`                                    | Свести замеры по блокам, остановиться там, где выгода < риска; островные контексты (`image`/`forms`/`maps`/`analytics`/`windowWidth`/`animate`) не трогать                                                                                              | 2.2–2.4          |

**Фан-аут Этапа 2:** блоки независимы → шаги **2.2–2.4 фанаутятся по одному агенту на блок** (worktree на блок, чтобы правки не конфликтовали), после каждого — свой замер и `playwright`. Пайплайн: `отбор → [конверсия+verify]×N блоков → сводный замер`.

### Граф зависимостей

```
ЭТАП 1 (обязательный)
  ┌─ 1.1 Ядро ─────┐
  │                ├─► 1.4 Guardrails ─┐
  ├─ 1.2 Периферия ┘                   ├─► 1.5 Verify ─► 1.6 Доки/релиз
  └─ 1.3 Editor+server+exports ────────┘
        (параллельно; import type в models — до 1.5)

ЭТАП 2 (опциональный, требует ок по инварианту #8)
  2.0 Baseline ─► 2.1 Отбор ─► [2.2–2.4 Конверсия+verify] × N блоков ─► 2.5 Замер
```

### Развилки к закрытию

1. **Subpath-экспорты `./models`/`./utils`** — решено «да», исполняется в шаге 1.3 (обязательно для Этапа 2, полезно уже на Этапе 1).
2. **Локальное ослабление инварианта #8** (`contexts over prop drilling` на **листовом** слое) — согласовать до старта 2.x. Без «ок» Этап 2 не делаем; Этап 1 инвариант не задевает.

### Явно вне scope

- Этап 1: никаких шимов/форк-реализаций/переноса в server — только границы. Граница ложится на `PageConstructor` как единый client-остров.
- Этап 2: не трогаем интерактивные блоки; не «дошимиваем» контексты, которым нужно рантайм-значение (тема после переключения в браузере, ширина окна); `react-server` export condition — опционально и только для честно форкаемых чисто-данных модулей.

---

## Верификационный проект (Next 14) и baseline-ошибки

Для S7 создан отдельный smoke-test проект **вне** репозитория библиотеки, чтобы не задевать её lint/build-globs.

### Расположение и стек

- **Путь:** `/Users/peterkrotov/page-constructor-next-rsc` (sibling к `page-constructor-1`).
- **Стек:** Next.js **14.2.35** (App Router, TypeScript, без Tailwind/ESLint), React **18.3.1**.
- **Как поставлена библиотека:** локальная сборка через `npm pack` (а не npm-версия), чтобы проект тестировал наши правки. Установлен tarball `gravity-ui-page-constructor-8.13.2.tgz` + peer-зависимости `@gravity-ui/uikit@^7`, `@diplodoc/transform@^4`.
- **Файлы:**
  - `app/page.tsx` — **серверный компонент** (без `use client`), рендерит `PageConstructorProvider` + `PageConstructor` с одним `header-block`. Это и есть проверяемый сценарий.
  - `app/layout.tsx` — подключает стили `@gravity-ui/uikit/styles/*` + `@gravity-ui/page-constructor/styles/styles.css`, ставит класс `g-root g-root_theme_light`.

### Baseline (до S3/S4) — воспроизведённая ошибка ❌

Команда: `cd /Users/peterkrotov/page-constructor-next-rsc && npm run build`

Компиляция проходит (`✓ Compiled successfully`), падение — на этапе `Collecting page data`:

```
TypeError: ef.createContext is not a function
    at 62866 (.next/server/app/page.js …)
    …
Build error occurred
Error: Failed to collect page data for /
```

**Интерпретация:** это ровно проблема из тикета. При рендере страницы-серверного-компонента модули `src/context/*` вызывают `React.createContext`, которого нет в серверном рантайме React (RSC-сборка не экспортирует `createContext`). Барел `@gravity-ui/page-constructor` без `'use client'` затягивает контексты в серверный граф → падение.

> Важно: ошибка приходит **на этапе `Collecting page data`** (server prerender), а не при компиляции. Значит блокирует именно отсутствие клиентской границы, а не типы/бандлинг.

### Целевое состояние (после S3/S4) — ожидаемо ✅

После того как библиотека получит границы `'use client'`, цикл ретеста:

```sh
# 1) пересобрать и переупаковать библиотеку
cd /Users/peterkrotov/page-constructor-1
npm run build:client && npm run build:server && npm pack
# 2) переустановить tarball в smoke-test проект
cd /Users/peterkrotov/page-constructor-next-rsc
npm i /Users/peterkrotov/page-constructor-1/gravity-ui-page-constructor-8.13.2.tgz
# 3) собрать заново — ожидаем успешный prerender '/'
npm run build
```

Критерий успеха S7: `npm run build` проходит без `Failed to collect page data`, страница `/` рендерится на сервере.

### Реестр блокирующих ошибок

| #   | Ошибка                                                                                     | Где всплывает                                                  | Причина                                                                                                                                                                                                                                                                     | Статус / фикс                                                                                                                                                     |
| --- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E1  | `TypeError: <react>.createContext is not a function` → `Failed to collect page data for /` | `next build`, этап Collecting page data (server prerender)     | контекст-модули без `'use client'` попадают в **серверный граф** и вычисляют `createContext` на eval                                                                                                                                                                        | ✅ **Решена.** Граница `'use client'` (обёртка ИЛИ директивы S3/S4) → контексты исполняются в клиентском бандле                                                   |
| E2  | `ReferenceError: document is not defined`                                                  | `next build`, этап Generating static pages (**SSR** пререндер) | модуль в клиентском бандле трогает `document`/`window` **на верхнем уровне**; `PageConstructor` тянет `blockMap` из `constructor-items.ts`, который статически импортит **все** блоки → в бандл попадают Share (`github-buttons`), Slider (`swiper`), Map-загрузчики и т.п. | ⚠️ **Обойдена** через `dynamic(..., {ssr:false})`. Правильный фикс — SSR-safety: гард top-level доступа к браузеру в библиотеке / ленивая загрузка тяжёлых блоков |

### Эксперимент: обёртка vs директивы (проверено в Next-проекте)

**E1 чинится границей `'use client'` — двумя способами:**

| Подход                                                                      | Что делает                                                                   | Плюсы                                                                           | Минусы                                                                                 |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **A. Обёртка** (`app/pc-client.tsx` с `'use client'`, ре-экспорт/`dynamic`) | одна клиентская граница на стороне консюмера или отдельным входом библиотеки | 1 файл, «из коробки» без правки 190 модулей                                     | **всё** поддерево становится client; главный барел остаётся серверным только для типов |
| **B. Директивы S3/S4**                                                      | `'use client'` на настоящих клиентских модулях                               | главный барел server-importable (типы/schema/utils), задел под острова (Фаза 7) | много файлов (скриптуется)                                                             |

> Важно: **E2 не зависит от выбора A/B.** Next всё равно SSR-ит клиентские компоненты при пререндере, поэтому top-level доступ к `document`/`window` падает и при обёртке, и при директивах. Значит для «из коробки **с SSR**» библиотеке в любом случае нужна SSR-safety (гард browser-доступа) ИЛИ потребитель отключает SSR через `ssr:false`.

**Достигнутое состояние (обёртка + `ssr:false`):** `next build` зелёный, страница `/` — серверный компонент, пререндерится статикой, конструктор рендерится на клиенте. Файлы примера: `app/page.tsx` (RSC), `app/PageView.tsx` (`'use client'` композиция), `app/pc-client.tsx` (`dynamic`, `ssr:false`).

### Следующие блокеры (ожидаемые)

- После включения SSR (без `ssr:false`) E2 нужно закрыть в библиотеке: найти top-level `document`/`window` (кандидаты — `github-buttons`, `swiper`, `react-slick`, загрузчики карт) и обернуть в `typeof window !== 'undefined'` или ленивую загрузку.
- Возможны E3+ (другие браузерные API при SSR, `React.lazy`/`Loadable`) — фиксируем сюда же по мере всплытия.

---

## Как растить серверную долю (Фаза 7, опциональная оптимизация)

> Отдельная тема **после** того, как «из коробки» заведётся (S3–S7). Цель — перевести часть компонентов из client в server, чтобы отдавать больше HTML с сервера и грузить меньше JS. Ниже — что реально возможно, потолок каждого подхода и карта, где двигать границу.

### Жёсткое ограничение (почему контекст нельзя «дошимить» до конца)

Контекст в RSC — **клиентская механика**. Ошибка E1 (`createContext is not a function`) прилетает **на eval модуля**, а не на рендере: в серверной сборке React `createContext` = `undefined`, а `useContext` не видит стек провайдеров (их на сервере нет). Отсюда:

- Хелпер **может** сделать модуль контекста import-safe и вернуть **дефолт**.
- Хелпер **не может** вернуть «живое» значение провайдера на сервере (переключённая юзером тема, ширина окна, `isMobile` по `matchMedia`) — этого значения на сервере физически нет.

Вывод: шим спасает только компоненты, которым достаточно дефолта/статики, а не рантайм-значения.

### Рычаг 1 — изоморфный context-хелпер (guard + server default)

Обёртка: на клиенте — настоящий контекст, на сервере — пассивная заглушка с дефолтом.

```ts
// src/utils/isomorphicContext.ts  (server-safe, БЕЗ 'use client')
import * as React from 'react';

const isServer = typeof React.createContext !== 'function';

export function createIsomorphicContext<T>(defaultValue: T) {
  if (isServer) {
    // сервер: не трогаем React-контекст, отдаём пассивную заглушку
    const ctx = {Provider: ({children}: any) => children, _default: defaultValue};
    return {Context: ctx as any, useValue: () => defaultValue};
  }
  const Context = React.createContext<T>(defaultValue);
  return {Context, useValue: () => React.useContext(Context)};
}
```

- **Даёт:** компонент, читающий контекст только ради дефолта, становится server-safe.
- **Не даёт:** компоненту, которому нужно настоящее значение провайдера, всё равно быть client.
- **Итог:** сам по себе сдвигает границу мало; полезен в связке с рычагом 2.

### Рычаг 2 (сильный) — инверсия `context → props` + острова

Читать контексты **один раз на клиентской границе** и прокидывать разрезолвленные значения вниз пропами → листья становятся чистыми `(props) => JSX` и переезжают в server. Интерактив (`Slider`, `Map`, формы, видео) остаётся «островами» client.

В page-constructor это идеально ложится на `getThemedValue` — она **уже чистая**, берёт тему аргументом:

```tsx
// сейчас (client): завязка на контекст
const theme = useTheme(); // useContext → client
const media = getThemedValue(props.media, theme);

// целевое (server): тема приходит пропом от клиентской границы
function Card({media, theme}: Props) {
  // без useContext
  const resolved = getThemedValue(media, theme); // остаётся чистой
}
```

Тогда `Content`, `Title`, `Banner`, карточки становятся серверными; в бандл уезжает меньше JS.

### Карта контекстов: что резолвится на серверной границе

Ключ — разделить контексты на **конфиг, известный на сервере**, и **client-онли рантайм**:

| Контекст                     | Резолвится на сервере? | Источник значения            |
| ---------------------------- | ---------------------- | ---------------------------- |
| `theme`                      | да                     | cookie / проп консюмера      |
| `localeContext`              | да                     | заголовки / роут             |
| `mobileContext` (`isMobile`) | да                     | User-Agent / headers         |
| `ssrContext`                 | да                     | по определению               |
| `projectSettingsContext`     | да                     | статический конфиг консюмера |
| `imageContext`               | нет                    | нужен loader/handlers        |
| `formsContext`               | нет                    | нужны handlers               |
| `mapsContext`                | нет                    | ключи + браузерный API       |
| `analyticsContext`           | нет                    | handlers/браузер             |
| `windowWidthContext`         | нет                    | `resize` / `matchMedia`      |
| `animateContext`             | нет                    | скролл в браузере            |

Всё из колонки «да» консюмер уже имеет на серверной границе → эти значения передаются пропами, и с потребляющих их листьев снимается клиентская метка. Всё «нет» — остаётся островами.

### Рекомендация и границы применения

- **Не делать это в S3/S4.** Там задача — просто расставить `'use client'` и разблокировать тикет минимальным риском (граница ляжет на `PageConstructor`).
- **Фаза 7 (после S7):** ввести рычаг 2 точечно — server-shell для статических блоков (`Header`, `Banner`, `Content`) с темой/locale через пропы, интерактив — острова. Начать с блоков без интерактива (см. server-safe листья в разделе S1).
- **Связь с инвариантом:** это **локальное** ослабление правила «contexts over prop drilling» из `architecture.md` — только на **листовом** слое. Кросс-катящий рантайм-конфиг остаётся в контекстах на клиентской границе; презентационные листья переводятся на пропы. Осознанный точечный компромисс, а не отмена инварианта.

### Метрика успеха Фазы 7

- Доля server-компонентов в дереве `PageConstructor` растёт (меньше `'use client'`-модулей в критическом пути статического блока).
- Размер клиентского JS для страницы из статических блоков падает (замер `next build` → First Load JS до/после).
- Ни один блок не теряет интерактив (острова остаются client).

---

## Учебный трек — как изучить тему (пошагово)

> Куратор-план для погружения в RSC под нашу задачу. Порядок модулей = порядок изучения: от ментальной модели → к директивам → к композиции → к специфике **авторов библиотек** (наш случай) → к верификации. Каждый урок привязан к фазе плана (S1–S9) и/или к конкретной находке аудита выше.
>
> Легенда приоритета: ⭐ обязательно · 📘 углубление · 🛠 практика/эталон конфигурации.

### Модуль 0 — Ментальная модель RSC

| #      | Урок (цель)                                                             | Ссылки                                                                                       | Зачем нам                                                                                                  |
| ------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 0.1 ⭐ | Что такое Server Components: две среды (server/client), что «RSC ≠ SSR» | [react.dev · Server Components](https://react.dev/reference/rsc/server-components)           | База для всего документа; объясняет, почему модуль без `'use client'` считается серверным (см. «Контекст») |
| 0.2 ⭐ | Целостная картина: props, ре-рендеры, связка с Suspense/Streaming SSR   | [Josh Comeau · Making Sense of RSC](https://www.joshwcomeau.com/react/server-components/)    | Лучшее «человеческое» объяснение модели; снимает путаницу RSC vs SSR                                       |
| 0.3 📘 | RSC «с нуля»: как устроен payload, сериализация client-компонентов      | [Dan Abramov · RSC From Scratch](https://github.com/reactwg/server-components/discussions/5) | Понимание, почему `'use client'` — это граница графа модулей, а не «флаг компонента»                       |

### Модуль 1 — Директивы `'use client'` / `'use server'`

| #      | Урок (цель)                                                                                             | Ссылки                                                                                                                                        | Зачем нам                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1.1 ⭐ | `'use client'`: семантика границы, транзитивность импортов, правила синтаксиса (первая строка, кавычки) | [react.dev · 'use client'](https://react.dev/reference/rsc/use-client)                                                                        | Прямо обосновывает вывод **S2** (директива = голый литерал первой строкой) и стратегию «границы на листьях»      |
| 1.2 📘 | Обзор всех директив разом                                                                               | [react.dev · Directives](https://react.dev/reference/rsc/directives)                                                                          | Быстрый референс, чтобы не путать `'use client'` и `'use server'`                                                |
| 1.3 📘 | `'use server'` и Server Functions (это НЕ «пометка серверного компонента»)                              | [react.dev · 'use server'](https://react.dev/reference/rsc/use-server) · [Server Functions](https://react.dev/reference/rsc/server-functions) | Развеивает частую ошибку «для сервера нужен `use server`»; пригодится в примере S7 (контент через server action) |

### Модуль 2 — Композиция client ↔ server (Next.js App Router)

| #      | Урок (цель)                                                                                                                                                     | Ссылки                                                                                                                                                | Зачем нам                                                                  |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 2.1 ⭐ | Server и Client Components в App Router: серверный может рендерить клиентского ребёнка, но не наоборот                                                          | [Next.js · Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)                                    | Наш целевой сценарий: серверная `page.tsx` рендерит `PageConstructor` (S7) |
| 2.2 ⭐ | Паттерны композиции: props должны быть сериализуемы; Server Components как `children`/props клиентского компонента; «граница каскадит по импортам, не по props» | [Next.js 14 · Composition Patterns](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns)                          | Фундамент для **Рычага 2** (инверсия `context → props`, острова) из Фазы 7 |
| 2.3 🛠 | Минимизация клиентского бандла: `'use client'` на узких интерактивных листьях, а не на крупных поддеревьях                                                      | тот же раздел, блок «Reducing bundle size» в [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Обоснование развилки «листья vs под-барелы» (рекомендация — листья)        |

### Модуль 3 — Контекст в RSC (наш E1)

| #      | Урок (цель)                                                                            | Ссылки                                                                                                                                | Зачем нам                                                                                           |
| ------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 3.1 ⭐ | Почему `createContext` недоступен в серверном компоненте — официальная страница ошибки | [Next.js · createContext in a Server Component](https://nextjs.org/docs/messages/context-in-server-component)                         | Дословно наш **E1** (`createContext is not a function` → `Failed to collect page data`)             |
| 3.2 📘 | Как контекст работает в React (что именно ломается на сервере)                         | [react.dev · createContext](https://react.dev/reference/react/createContext)                                                          | Объясняет «жёсткое ограничение» из Фазы 7: шим отдаёт только дефолт, не рантайм-значение провайдера |
| 3.3 ⭐ | Оборачивание сторонних провайдеров в client-компонент (root layout + `{children}`)     | раздел «Context providers» в [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Паттерн для `PageConstructorProvider`; закрывает E1 через S3                                        |

### Модуль 4 — Авторам библиотек (ядро нашей задачи)

| #      | Урок (цель)                                                                                                                         | Ссылки                                                                                                                                                                                         | Зачем нам                                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 ⭐ | Полный гайд «как поддержать RSC в своей библиотеке»: где ставить `'use client'`, риск срезания директивы бандлером, banner-инъекция | [Bekk · Support RSC in your library](https://www.bekk.christmas/post/2023/19/keep-up-with-react-server-components-how-to-support-it-in-your-library)                                           | Наиболее близкий к нашей задаче материал; сверить с выводом S2 (у нас gulp/tsc директиву НЕ срезает)                                        |
| 4.2 📘 | RFC 0227 «Server Module Conventions» — первоисточник семантики директив и границ                                                    | [reactjs/rfcs · 0227](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md)                                                                                        | Первоисточник правила «помечай только точки, потребляемые сервером напрямую» → наша стратегия «точечная граница»                            |
| 4.3 🛠 | Бандлинг библиотеки с RSC на Rollup: `preserveModules`, banner только на client-чанк, `terser {compress:{directives:false}}`        | [DEV · RSC + Client Components with Rollup](https://dev.to/mryechkin/react-server-components-and-client-components-with-rollup-3c05)                                                           | Эталон на случай, если S6 покажет, что директиву где-то срезает; у нас пока не требуется                                                    |
| 4.4 📘 | Дискуссия мейнтейнеров Next: как паковать server-пакеты с client-компонентами                                                       | [vercel/next.js · Discussion #62231](https://github.com/vercel/next.js/discussions/62231)                                                                                                      | Кейсы граничных случаев (смешанные чанки, subpath-экспорты) → развилка про `./models`/`./utils`                                             |
| 4.5 📘 | `react-server` export condition: когда `'use client'` мало и нужна форк-реализация модуля                                           | [react.dev · 'use client' (раздел про bundler requirements)](https://react.dev/reference/rsc/use-client) · кейс [lucide-icons/lucide#4200](https://github.com/lucide-icons/lucide/issues/4200) | Альтернатива **Рычагу 1**: server-форк модуля контекста через `exports["react-server"]` вместо изоморфного шима (риск #2, `models` + uikit) |

### Модуль 5 — Верификация и отладка

| #      | Урок (цель)                                                                                   | Ссылки                                                                                                             | Зачем нам                                                                                         |
| ------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| 5.1 🛠 | Как ретестить: `next build` → этап «Collecting page data» ловит серверные ошибки эвала модуля | [Next.js · Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Наш критерий успеха S7 (сборка без `Failed to collect page data`)                                 |
| 5.2 📘 | Индекс ошибок Next.js (быстрый лукап вторичных падений после S3)                              | [Next.js · context-in-server-component](https://nextjs.org/docs/messages/context-in-server-component)              | При появлении E2/E3 (хуки в блоках, `window` при импорте, `React.lazy`) — искать по этому индексу |

### Маппинг уроков на фазы плана

| Фаза / субагент                                               | Обязательные уроки перед стартом  |
| ------------------------------------------------------------- | --------------------------------- |
| Понимание модели (все)                                        | 0.1, 0.2, 1.1                     |
| **S3/S4** — расстановка `'use client'`                        | 1.1, 2.1, 2.3, 3.1, 3.3, 4.1, 4.2 |
| **S5** — editor + чистота `/server`, `import type` в `models` | 4.2, 4.5                          |
| **S6** — guardrails (eslint + build-assert)                   | 1.1, 4.1, 4.3                     |
| **S7** — Next.js 14 пример                                    | 2.1, 2.2, 3.1, 5.1                |
| **Фаза 7** — рост серверной доли (`context → props`, острова) | 2.2, 3.2, 4.5                     |
