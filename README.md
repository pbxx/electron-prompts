
# electron-prompts
![Logo](_docs/static/img/prompt-screenshot.png)

An easy tool for creating interactive prompts from the Electron main process

# Installation
```bash
npm install electron-prompts
```

# Usage
Import and instantiate a `PromptManager` for your project:
```js
import PromptManager from "electron-prompts"

const prompts = new PromptManager()
```

Create and spawn GUI prompts using simple [Prompt Templates](https://pbxx.github.io/electron-prompts/docs/api/data-structures/promptTemplate):
```js
const pTemplate = {
	windowTitle: "electron-prompts",
	cancelButton: {
		classes: ["btn", "btn-secondary"]
	},
	elements: [
		{
			type: "header",
			value: "Enter test value",
		},
		{
			type: "paragraph",
			value: "This is an easy user-input prompt made with electron-prompts:",
		},
		{
			type: "input",
			name: "testValue",
			placeholder: "Test input",
			value: "I am the default value",
			classes: ["form-control"],
		},
	],
	buttons: [
		{
			name: "submit",
			value: "Save Changes",
			classes: ["btn", "btn-primary"],
		},
	],
}

const result = await prompts.spawn(pTemplate)
```

Further documentation available [here](https://pbxx.github.io/electron-prompts/).