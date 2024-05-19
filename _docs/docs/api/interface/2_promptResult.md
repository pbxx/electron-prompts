# PromptResult
The prompt result is returned from the [`spawn()`](../prompt-manager/spawn.md) method after user completion when either:
- A value was changed on an input [Form Element](./form-element-objects/index.md)
- A button from the Prompt Template was pressed

An example of a Prompt Result object with one changed value is below:
```js
{
  values: { testValue: 'I am the changed value' },
  button: 'submit'
}
```

## `values` object
A Prompt Result only contains a `values` object if the prompt had input elements, and one or more values were changed.

The keys of the items in the `values` object are defined by the `name` property of the [Form Element](./form-element-objects/index.md) that was used to create the input.



## `button` string

The `button` property of the Prompt Result will contain:
- The `string` `name` of the button that was used to submit it, as defined in the button's [Button Element](./3_button-element-objects.md)
- `_enter` if the enter key was used

### Example
If the prompt had no input fields, or was submitted without changing them, the Prompt Result object will only contain a `button` key:

```js
{
  button: 'submit'
}
```