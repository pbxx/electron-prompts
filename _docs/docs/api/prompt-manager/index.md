# PromptManager

The `PromptManager` class orchestrates all spawning of prompts and returning of changed data. 

```js
const prompts = new PromptManager(/*opts?: PromptManagerOptions*/)
```

The class accepts an optional `options` object as a parameter:

| Property | Required | Default | Details |
| -------- | ------- | ------- | ------- |
| `width` | No | `600` | Sets the width of the prompt window |
| `baseHeight` | No | `112` | The minimum height of the window before content. Prompt window is automatically sized-up for content |
| `resizable` | No | `false` | Allows the user to resize spawned prompts |
| `promptFile` | No | `src/static/prompt/prompt.html` | Set the html file that will be loaded in the prompt window *(docs coming soon)* |
| `devMode` | No | `false` | Enables verbose logging |
| `logLevel` | No | `3` | Sets the log level when `devMode` is false. By default, only `[WARN]` and greater severity logs are shown. |
| `devLogLevel` | No | `6` | Sets the log level when `devMode` is true. By default, all severity logs are shown. |