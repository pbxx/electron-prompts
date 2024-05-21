# Form Element
The Form Element is an `object` that defines a text or input element to be used in a prompt.

The `string` `type` property of the Form Element object defines what type of element to create, and can be one of the following:
- `header` for a header text display
- `paragraph` for a paragraph text display
- `input` for a configurable HTML `input`
- `select` for an HTML `select` dropdown menu

## type: `header`

The `header` type inserts an HTML `h4` element into the prompt to display header text

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

The `input` type [Form Element](./index.md) will create an HTML `input` element in the prompt that will return a value in the [Prompt Result](/docs/api/interface/2_promptResult.md) if changed

| Property | Required | Type | Default | Details |
| --- | -- | -- |-- | -- |
| `name` | Yes | `string` | N/A | Key name that will be used in the [Prompt Result](/docs/api/interface/2_promptResult.md) `values` object if the value is changed. Must be unique to the prompt. |
| `placeholder` | No | `string` | N/A | The lighter text that appears when the input is empty. |
| `value` | No | `string` | N/A | The default value that will already be in the input. |
| `attributes` | No | `Object` | N/A | An object of attributes where `key` is the HTML attribute name, and `value` is attribute value |
| `classes` | No | `Array` | N/A | An `Array` of `string` CSS classes to apply to the input. |

<!-- | `inputType` | No | `string` | `text` | The `type=` attribute for the `<input>` element to be created. Any string-based [HTML `<input>` type](https://www.w3schools.com/html/html_form_input_types.asp) can be used. | -->

### `input` example
This element is highly customizable via the `type` attribute. See [Using the `type` attribute](./type-input.md) for more details
```js
{
    type: "input",
    name: "pin",
    placeholder: "Enter a new PIN to continue",
    attributes: {
        type: "password"
    }
},
```



## type: `select`

The `select` type property will create a `select` menu element in the prompt that will automatically return the value if changed

| Property | Required | Type | Default | Details |
| --- | -- | -- |-- | -- |
| `name` | Yes | `string` | N/A | Key name that will be used in the [Prompt Result](/docs/api/interface/2_promptResult.md) `values` object if the value is changed. Must be unique to the prompt. |
| `options` | No | `Array` | N/A | An `Array` of Options Elements to add to the select menu. |
| `classes` | No | `Array` | N/A | An `Array` of `string` CSS classes to apply to the input. |

### `select` example

```js
{
    type: "select",
    name: "testSelect",
    options: [
        { value: "test1", text: "Test option 1" },
        { value: "test2", text: "Test option 2", selected: true },
    ]
}
```