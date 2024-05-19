# PromptManager
## `PromptManager` class

The `PromptManager` class orchestrates all spawning of prompts and returning of changed data. 

```js
const prompts = new PromptManager(/* PromptManagerOptions (optional) */)
```

The class accepts an optional `PromptManagerOptions` object as a parameter:

| Property | Required | Default | Details |
| -------- | ------- | ------- | ------- |
| `width` | No | `600` | Sets the width of the prompt window |
| `baseHeight` | No | `112` | The minimum height of the window before content. Prompt window is automatically sized-up for content |
| `resizable` | No | `false` | Allows the user to resize spawned prompts |
| `promptFile` | No | `src/static/prompt/prompt.html` | Set the html file that will be loaded in the prompt window. See [Creating a prompt HTML file](../../customizing-prompts/1_creating-a-prompt.md). |
| `devMode` | No | `false` | Enables verbose logging |
| `logLevel` | No | `3` | Highest level logs to display when `devMode` is false. By default, only `[WARN]` and greater severity logs are shown. |
| `devLogLevel` | No | `6` | Highest level logs to display when `devMode` is true. By default, all severity logs are shown. |

### Usage example
```js
const prompts = new PromptManager({
  devMode: true,
  resizable: true,
})
```

## Log levels

`electron-prompts` uses log levels to control log verbosity.

These levels are set using the `logLevel` and `devLogLevel` properties in the `PromptManagerOptions` object:

| Level | Label | Description |
| ----- | ----- | ----------- |
| 0 | `null` | Mandatory logs, no tag will be printed. |
| 1 | `[FATAL]` | Fatal error. |
| 2 | `[ERROR]` | General error. |
| 3 | `[WARN]` | General warning. |
| 4 | `[INFO]` | Information. |
| 5 | `[DEBUG]` | Debugging information. |
| 6 | `[TRACE]` | Trace logging. |







