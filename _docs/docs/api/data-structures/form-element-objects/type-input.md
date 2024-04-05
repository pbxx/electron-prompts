# Using the `type` attribute

The `type` attribute, when passed to an `input` type [Form Element](./index.md), will set the HTML input `type` attribute, as well as configure changed data handling on the renderer based on the selected type

Some HTML input types need certain attributes to work correctly. Attributes can easily be included in a [Form Element](./index.md) object via the `attributes` property.

Refer to the [W3Schools](https://www.w3schools.com/html/html_form_input_types.asp) or [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) documentation for HTML input types for more information
## `input` with attribute `type="date"` example

```js
{
    name: "testValue",
    type: "input",
    attributes: {
        type: "date",
        min: "2002-01-01",
        max: "2102-01-01"
    },
    classes: ["form-control"],
    value: "2007-01-01"
},
```
## `input` with attribute `type="file"` example

```js
{
    name: "testValue",
    type: "input",
    attributes: {
        type: "file"
    },
    classes: ["form-control"],
},
```