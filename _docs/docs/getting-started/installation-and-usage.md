# Installation and usage

# Installation
```bash
npm install electron-prompts
```

# Usage
Import and instantiate a [`PromptManager`](/docs/api/prompt-manager/) for your project:
```js
import PromptManager from "electron-prompts"

const prompts = new PromptManager({
	devMode: true,
})
```

Create and spawn a prompt using [Prompt Templates](/docs/api/data-structures/promptTemplate):
```js
const pTemplate = {
	windowTitle: "electron-prompts",
	cancelButton: {
		classes: ["btn", "btn-secondary"],
		// value: "Lets slow'r down there partner..."
	},
	elements: [
		{
			type: "header",
			value: "The easiest prompts ever!",
		},
		{
			type: "paragraph",
			value: "An easy tool to enable spawning prompts from the Electron main process",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Test input",
			classes: ["form-control"],
			value: "With inputs!",
		},
		{
			type: "paragraph",
			value: "Also paragraphs",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Or even another input!",
			classes: ["form-control"],
			value: "",
		},
	],
	buttons: [
		{
			name: "submit",
			classes: ["btn", "btn-primary"],
			value: "Save Changes",
		},
	],
}
```
### 
Calling the async [`spawn()`](/docs/api/prompt-manager/spawn) method on the [`PromptManager`](/docs/api/prompt-manager/) instance, passing a [Prompt Template](/docs/api/data-structures/promptTemplate), will create a window and wait until the user input is captured to resolve:
```js
const result = await prompts.spawn(pTemplate)
```
![Logo](../../../src/assets/prompt-screenshot.png)


Once the prompt has been completed, the method returns a [Prompt Result](/docs/api/data-structures/promptResult) object, or `null` if prompt was closed or cancelled