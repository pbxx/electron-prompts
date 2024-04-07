# Getting the client script

Once the required elements are written into the prompt's HTML page, and assigned proper classes, all that is required is to include the library (and initialize if applicable).

## Using `<script>` tag
For convenience, the pre-bundled, self-initializing `electron-prompts-client` script is available to download from JSDelivr:
- [JSDelivr CDN](https://cdn.jsdelivr.net/npm/electron-prompts-client/dist/electron-prompts-client.min.js) (~4.7kb minified)
<!-- - JSDelivr CDN [download](https://cdn.jsdelivr.net/package/npm/electron-prompts-client) -->

It is recommended to *download* the js file, then load it in your page from a local file:
```html
<script src="./path/to/electron-prompts-client.js"></script>
```

## Using a module bundler
If your project is using a bundler such as Webpack, you can install `electron-prompts-client` using `npm`:
```sh
npm i electron-prompts-client
```
Then import and initialize it:
```js
import ElectronPromptsClient from "electron-prompts-client"

const prompts = new ElectronPromptsClient()
await prompts.init()
```