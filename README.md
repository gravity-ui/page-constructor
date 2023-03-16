# @gravity-ui/blog-constructor &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/blog-constructor)](https://www.npmjs.com/package/@gravity-ui/blog-constructor)

## Install

```shell
npm install @gravity-ui/blog-constructor
```

## Blog-constructor

`Blog-constructor` is a library based on the [Page-constructor](https://github.com/gravity-ui/page-constructor) library for creating blog format web pages. Blog-constructor uses the [`custom`](https://github.com/gravity-ui/page-constructor#custom-blocks) prop from page-constructor to add the components needed for the blog.

### Getting started

The blog-constructor has both client components and server components for import. The blog pages is imported as a React component. To make sure it runs properly, wrap it in `BlogConstructorProvider`:

```jsx
import {BlogPage, BlogConstructorProvider} from '@gravity-ui/blog-constructor';

// Main blog page
<BlogConstructorProvider>
    <BlogPage
        content={content}
        posts={posts}
        tags={tags}
        getPosts={handleGetPosts}
        settings={settings}
    />
</BlogConstructorProvider>

---

import {BlogPostPage, BlogConstructorProvider} from '@gravity-ui/blog-constructor';

// Post page
<BlogConstructorProvider {...providerProps}>
    <BlogPostPage
        content={content}
        post={post}
        suggestedPosts={suggestedPosts}
        settings={settings}
        shareOptions={shareOptions}
    />
</BlogConstructorProvider>

```

Also blog-constructor have server components to help you transform your data if you need

```jsx
import {
  transformPost,
  sanitizeMeta,
  createReadableContent,
  transformPageContent,
} from '@gravity-ui/blog-constructor/server';
```

## i18n

To make sure the i18n library used in your project runs properly, perform its initialization and set the project's current locale value in `lang`. For example:

```typescript
import {configure, Lang} from '@gravity-ui/blog-constructor';

configure({lang: Lang.En});
```

## Development

```bash
npm ci
npm run dev
```
