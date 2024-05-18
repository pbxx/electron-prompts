# Creating a prompt HTML file
The `electron-prompts` module allows for highly-customizable Electron renderer prompt windows, using your own HTML, CSS and JS.

In order to customize the prompt, you will need to create an HTML file with some specific elements, and include the [Client Script](./adding-client-script) in your page script. 

The [Client Script](./adding-client-script) will need the following elements in order to work properly:
-  `<div>` with class `epc-elembox`
    - This is the div responsible for holding [Form Elements](https://pbxx.github.io/electron-prompts/docs/api/data-structures/form-element-objects)
    - It should display elements in vertical order, such as when `flex-direction: column;` is applied with CSS.
    - It should have `overflow-y` set to `auto`, ideally. (This will help when tweaking the [`baseHeight`](../api/prompt-manager/index.md) option)
- `<div>` with class `epc-buttonbox`
    - This is the div that will hold the [Button Elements](https://pbxx.github.io/electron-prompts/docs/api/data-structures/button-element-objects) that are rendered in the prompt.
    - By default, this is displayed at the bottom of the prompt window.
- Text element with class `epc-titletext`
    - Displays the `windowTitle` option assigned in the prompt's [Prompt Template](https://pbxx.github.io/electron-prompts/docs/api/data-structures/promptTemplate).
    - Acceptable elements could be `<span>`, `<p>`, or `<h5>`, etc.
- Visible area with style `-webkit-app-region: drag;`
    - Electron requirement when using frameless windows
    - If there is no visible (and clickable) `drag` region, the window will not be draggable by the user

## Example HTML file
```html
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Include stylesheets here -->
  <link rel="stylesheet" href="./styles-basic.css">
  <title>Loading...</title>
</head>

<body>
  <div class="page-wrapper">
    <div class="title-bar draggable">
      <span class="epc-titletext">Loading...</span>
    </div>
    <div class="epc-elembox">

    </div>
    <div class="epc-buttonbox">

    </div>
  </div>
  <!-- Include client script here -->
  <script src="./path/to/electron-prompts-client.js"></script>
</body>

</html>
```

## Basic layout CSS
You can structure the elements in your prompt in any way you would like to. However, for convenience, some basic layout css is provided below to provide a good starting point:
```css
html,
body {
	min-height: 100vh;
	background-color: #0000;
}

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

.page-wrapper {
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: white;
}

.title-bar {
	background-color: lightgray;
	display: flex;
	align-items: center;
	justify-content: center;
}

.epc-elembox,
.epc-buttonbox {
	width: 100%;
	display: flex;
}

.epc-elembox {
	flex-direction: column;
	overflow-y: auto;
}

.epc-buttonbox {
	flex-direction: row;
	justify-content: flex-end;
	background-color: lightgray;
}

.draggable {
	-webkit-user-select: none;
	user-select: none;
	-webkit-app-region: drag;
}
```
## Init PromptManager with `promptFile` option
In the Electron main process, your [PromptManager](../api/prompt-manager/index.md) will need to be spawned with the `promptFile` option pointing at the custom HTML file for your app's prompts, like this:
```js
const prompts = new PromptManager({
	promptFile: "src/static/prompt/index.html"
})
```
## Result
To provide a simple starting-point, the above HTML and CSS result in a nearly-unstyled prompt that looks like this: 
![Logo](../../../src/assets/basic-prompt-styling.png)

If your [PromptManager](../api/prompt-manager/index.md) was spawned with the `devMode` option, you can spawn a DevTools window for debugging in your prompt by pressing `Ctrl+Shift+I` while it is open.
