# Form Element
The Form Element is an `object` that defines a text or input element to be used in a prompt.

The `type` property of the Form Element object defines what type of element to create, and can *currently* only be one of the following:
- `"header"`
- `"paragraph"`
- `"input"`

## type: `header`

The `header` type property inserts an `h4` element into the prompt to display header text

| Property | Required | Type | Default | Details |
| --- | -- | -- |-- | -- |
| `value` | No | `string` | N/A | The text to display in the header |

### `header` example

```js
{
    type: "header",
    value: "Please enter your username to continue",
}
```

## type: `paragraph`

The `paragraph` type property inserts an `p` element into the prompt to display general text

| Property | Required | Type | Default | Details |
| --- | -- | -- |-- | -- |
| `value` | No | `string` | N/A | The text to display in the header |

### `paragraph` example

```js
{
    type: "paragraph",
    value: "This is a test of the prompt module. It can be a long paragraph if it needs to be, because the text wraps!",
}
```




## type: `input`

The `input` type property will create a text input in the prompt that will automatically return the value if changed

| Property | Required | Type | Default | Details |
| --- | -- | -- |-- | -- |
| `name` | Yes | `string` | N/A | Key name that will be used in the [Prompt Result](/docs/api/data-structures/2_promptResult.md) `values` object if the value is changed. Must be unique to the prompt. |
| `placeholder` | No | `string` | N/A | The lighter text that appears when the input is empty. |
| `value` | No | `string` | N/A | The default value that will already be in the input. |
| `classes` | No | `Array` | N/A | An `Array` of `string` CSS classes to apply to the input. |

### `input` example

```js
{
    type: "input",
    name: "username",
    placeholder: "Enter a username to begin",
    value: "pbxx",
    classes: ["form-control"],
},
```

