# `spawn` method

The async `spawn()` method spawns a prompt window given a passed [Prompt Template](/docs/api/data-structures/promptTemplate):

```js
const prompts = new PromptManager()
const promptTemplate = {
	windowTitle: "electron-prompts",
	elements: [
		{
			type: "header",
			value: "The easiest prompts ever!",
		},
		{
			type: "paragraph",
			value: "An easy tool to enable spawning prompts from the Electron main process",
		},
	],
	buttons: [
		{
			name: "accept",
			classes: ["btn", "btn-primary"],
			value: "Accept and continue",
		},
	],
}
const result = await prompts.spawn(promptTemplate)
```

The method will wait for the user to submit or cancel the prompt before resolving.

### Arguments

| Name             | Required | Default | Details                                                                                                            |
| ---------------- | -------- | ------- | ------------------------------------------ |
| `promptTemplate` | Yes      | N/A     | The [Prompt Template](/docs/api/data-structures/promptTemplate) to use when spawning the prompt and returning data |

### Returns

Returns (resolves) a [Prompt Result](/docs/api/data-structures/promptResult) object if the prompt was submitted, or `null` if it was cancelled
