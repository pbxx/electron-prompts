
# electron-prompts
![Logo](assets/prompt-screenshot.png)

An easy tool to enable prompts from the Electron main process

# Installation
```bash
npm install electron-prompts
```

# Usage
Import and instantiate a `PromptManager` for your project:
```js
import PromptManager from "../index.js"

const prompts = new PromptManager({
	devMode: true,
})
```

Create and spawn a prompt using *prompt templates*:
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
			value: "Enter test value",
		},
		{
			type: "paragraph",
			value: "Add a space to the end of the default value to test changed value:",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Test input",
			classes: ["form-control"],
			value: "Add a space after me please:",
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

const result = await prompts.spawn(pTemplate)
```

*further documentation coming soon...*