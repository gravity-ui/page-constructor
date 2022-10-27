# Blog-constructor &middot; [![npm version](https://badger.yandex-team.ru/npm/@yandex-data-ui/blog-constructor/version.svg)](https://npm.yandex-team.ru/@yandex-data-ui/blog-constructor)

## Install

```shell
npm install @yandex-data-ui/blog-constructor
```

## Development

```bash
npm ci
npm run dev
```

## Publish

If you need to release a new version of the package, go to [TeamCity](https://teamcity.aw.cloud.yandex.net/project/Cloud_Instruments_BlogConstructor?mode=builds#all-projects)

If you are developing new functionality in your branch and you need to release a version in order to test the package in another project, you need to release an alpha version of the package.

Add next part in `package.json` in your branch.(after completion, you need to delete)

```json
  "publishConfig": {
    "tag": "alpha"
  }
```

For understanding, name your version `1.0.0-alpha.0` for example. Change the alpha-patch as you develop

After the end of development, delete the added entry from `package.json`

And finally, after merge your PR in master, publish you new **_major/minor/patch_** version in [TeamCity](https://teamcity.aw.cloud.yandex.net/project/Cloud_Instruments_BlogConstructor?mode=builds#all-projects)
