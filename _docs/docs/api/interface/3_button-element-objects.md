# ButtonElement
The Button Element `object` defines a button to be added to a prompt's button container.

| Property | Required | Type | Default | Details |
| --- | -- | -- |-- | -- |
| `name` | Yes | `string` | N/A | String that will be returned in the [Prompt Result](./2_promptResult.md) `button` property if the button is clicked. Must be unique to the prompt. |
| `value` | No | `string` | N/A | The text to display on the button. |
| `classes` | No | `Array` | N/A | An `Array` of `string` CSS classes to apply to the button. |

### Button Element object example
```js
{
    name: "submit",
    value: "Save Changes",
    classes: ["btn", "btn-primary"],
}
```