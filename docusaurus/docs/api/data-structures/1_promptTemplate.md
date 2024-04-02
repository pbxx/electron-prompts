# Prompt Template

The Prompt Template allows for customization of the text and inputs used in a prompt.

The layout of the Prompt Template is as follows:

```js
{
    windowTitle: "electron-prompts",
    cancelButton: {
        classes: ["btn", "btn-secondary"],
        value: "Go back..."
    },
    elements: [ 
        // Form Element objects go here...
        {
            name: "testValue",
            type: "input",
            placeholder: "Or even another input!",
            classes: ["form-control"],
            value: "",
        },
    ],
    buttons: [
        // Button Element objects go here...
        {
            name: "submit",
            classes: ["btn", "btn-primary"],
            value: "Save Changes",
        },
    ],
}
```

## `windowTitle` property
Sets the system window title for the prompt, and the document title on the prompt page

## `cancelButton` property
Allows customization of the cancel button with optional properties:

| Property | Required | type | Default | Details |
| -------- | ------- | ------- |------- | ------- |
| `classes` | No | `Array` | `undefined` | An array of string CSS classes to apply to the cancel button |
| `value` | No | `string` | `Cancel` | The text to display inside the cancel button |

## `elements` property
`Array` list of [Form Element objects](./form-element-objects) to use in the prompt

## `buttons` property
`Array` list of [Button Element objects](./button-element-objects) to use in the prompt

