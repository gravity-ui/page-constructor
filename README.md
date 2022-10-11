# Blog-constructor &middot; [![npm version](https://badger.yandex-team.ru/npm/@yandex-data-ui/blog-constructor/version.svg)](https://npm.yandex-team.ru/@yandex-data-ui/blog-constructor)

## Publish

If you need to release a new version of the package,

- manually update the version in the `package.json`,
- add writing in `CHANGELOG.md`
- run `npm publish` in CLI

If you are developing new functionality in your branch and you need to release a version in order to test the package in another project, you need to release an alpha version of the package.

Add next part in `package.json` in your branch.(after completion, you need to delete)

```json
  "publishConfig": {
    "tag": "alpha"
  }
```

For understanding, name your version `1.0.0-alpha.0` for example. Change the patch as you develop

After the end of development, delete the added entry from `package.json`

And finally publish you new **_major/minor/patch_** version
