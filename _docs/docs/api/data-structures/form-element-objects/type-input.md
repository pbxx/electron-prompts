# Using the input `type` attribute

The `type` attribute, when passed to an `input` type [Form Element](./index.md), will set the HTML input `type` attribute, as well as configure changed data handling on the renderer based on the selected type

Some HTML input types need certain attributes to work correctly. Attributes can easily be included in a [Form Element](./index.md) object via the `attributes` property.

Refer to the [W3Schools](https://www.w3schools.com/html/html_form_input_types.asp) or [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) documentation for HTML input types for more information

## type `"date"` example
The `"date"` type input will dreate a datepicker that will allow the user to select from a range of dates. The result in `PromptResult.values` when this type is changed is a JavaScript [Date String](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings)
```js
{
    name: "testDateValue",
    type: "input",
    attributes: {
        type: "date",
        min: "2002-01-01",
        max: "2102-01-01"
    },
    value: "2007-01-01"
},
```
### result in `PromptResult.values` on changed
```js
testDateValue: "2015-12-24"
```

## type `"file"` example

The `"file"` type input allows easy file inputs for single or multiple files. If the user selects files in the created input, this type will resolve an Array of Objects in `PromptResult.values` containing information about each file the user selected.

### example
```js
{
    name: "testFileValue",
    type: "input",
    attributes: {
        type: "file",
        multiple: true
    },
}
```

### result in `PromptResult.values` on changed
```js
testFileValue: [
    {
        name: "file.pdf", //String filename
        path: "C:\\my\\special\\files\\file.pdf", //String path (including filename)
        size: 71442, //File size in bytes
        lastModified: 1601590927699 //Number, UNIX timestamp in milliseconds 
    },
    {
        name: "file2.pdf",
        path: "C:\\my\\special\\files\\file2.pdf",
        size: 54332,
        lastModified: 1601590927699
    }
]
```
