var adoptedPrompt = null
var devMode = false

const logs = {
	log(...args) {
		if (devMode) {
			console.log(...args)
		}
	},
	error(...args) {
		if (devMode) {
			console.error(...args)
		}
	},
}

async function handleButtonClick(id, index) {
	logs.log(id, index)
	// await window.electronAPI.formDone(id, {foo: "bar"} )
	var promptResult = {
		button: index
	}
	if (Object.keys(formState).length > 0) {
		promptResult["values"] = formState
	}
	await window.electronAPI.formDone(id, promptResult)
	window.close()
}

async function handleCancel() {
	await window.electronAPI.cancel(adoptedPrompt.uuid)
	logs.log("cancel time!")
}

async function handleCancelButton() {
	await handleCancel()
	window.close()
}

var formStateDefaults = {}
var formState = {}

function updateForm(stateIndex) {
	
	const formValue = document.getElementById(`form-${stateIndex}`).value
	logs.log(stateIndex, formValue)
	if (formValue == formStateDefaults[stateIndex]) {
		// value is same as default
		if (stateIndex in formState) {
			delete formState[stateIndex]
		}
	} else {
		formState[stateIndex] = formValue
	}
	logs.log(formState)
}

const utils = {
	select: {
		findDefault: (arr) => {
			// finds the default value and index of the passed array of Option Elements
			var defaultIndex = 0
			var i = 0
			arr.forEach((optObj) => {
				// console.log(optObj)
				if ("selected" in optObj) {
					// console.log("found a default select option at index " + i)
					// this option was specified as default
					defaultIndex = i
				}
				i++
			})
			return defaultIndex
		}
	}
}

async function init() {
	const elems = {
		ebox: document.getElementById("elemBox"),
		bbox: document.getElementById("buttonBox"),
		titleText: document.querySelector(".titleBar span"),
	}
	adoptedPrompt = await window.electronAPI.adopt()
	if (adoptedPrompt) {
		if (adoptedPrompt.devMode) {
			// set devMode to true
			devMode = true
		}
		logs.log(adoptedPrompt, adoptedPrompt.windowTitle)
		// set title bar text
		elems.titleText.innerHTML = adoptedPrompt.windowTitle
		// set window title
		document.title = adoptedPrompt.windowTitle
		adoptedPrompt.elements.forEach((elem) => {
			// append each form element
			switch (elem.type) {
				case "header": {
					var domElem = elems.ebox.appendChild(document.createElement("h4"))
					domElem.innerHTML = elem.value
					if (elem.classes) {
						elem.classes.forEach((cssClass) => {
							domElem.classList.add(cssClass)
						})
					}
					break
				}
				case "paragraph": {
					var domElem = elems.ebox.appendChild(document.createElement("p"))
					domElem.innerHTML = elem.value
					if (elem.classes) {
						elem.classes.forEach((cssClass) => {
							domElem.classList.add(cssClass)
						})
					}
					break
				}
				case "input": {
					var domElem = elems.ebox.appendChild(document.createElement("input"))
					if ("inputType" in elem) {
						// an input type was specified
						domElem.setAttribute("type", elem.inputType)
					}
					const thisKey = elem.name
					formStateDefaults[thisKey] = elem.value
					if ("classes" in elem) {
						elem.classes.forEach((cssClass) => {
							domElem.classList.add(cssClass)
						})
					}
					
					domElem.setAttribute("placeholder", elem.placeholder ? elem.placeholder : `Original value: ${elem.value}`)
					domElem.value = elem.value
					domElem.setAttribute("id", `form-${thisKey}`)
					// event tracking
					domElem.setAttribute("onkeyup", `updateForm("${thisKey}")`)
					break
				}
				case "select": {
					var domElem = elems.ebox.appendChild(document.createElement("select"))
					const thisKey = elem.name
					if (elem.classes) {
						elem.classes.forEach((cssClass) => {
							domElem.classList.add(cssClass)
						})
					}
					console.log(elem)
					if (elem.options && Array.isArray(elem.options)) {
						// these are the options of the select
						var defaultOptionIndex = utils.select.findDefault(elem.options)
						formStateDefaults[thisKey] = elem.options[defaultOptionIndex].value
						var i = 0
						elem.options.forEach((opt) => {
							if (opt.value) {
								// value is required for a select
								var optElem = domElem.appendChild(document.createElement("option"))
								optElem.setAttribute("value", opt.value)
								optElem.innerHTML = (opt.text || opt.value)
								console.log(i, defaultOptionIndex)
								if (i == defaultOptionIndex) {
									// this is the default option
									optElem.selected = true
								}
							}
							i++
						})
					}

					// domElem.setAttribute("placeholder", elem.placeholder ? elem.placeholder : `Original value: ${elem.value}`)
					// domElem.value = elem.value
					domElem.setAttribute("id", `form-${thisKey}`)
					// event tracking
					domElem.setAttribute("onchange", `updateForm("${thisKey}")`)
					break
				}
			}
		})

		// size window up based on element content height
		await window.electronAPI.sizeUp(adoptedPrompt.uuid, elems.ebox.scrollHeight)
		console.log(formStateDefaults)

		//   append cancel button
		var cancelButton = elems.bbox.appendChild(document.createElement("button"))
		cancelButton.setAttribute("onclick", `handleCancelButton("${adoptedPrompt.uuid}")`)
		if (adoptedPrompt.cancelButton) {
			if (adoptedPrompt.cancelButton.classes) {
				adoptedPrompt.cancelButton.classes.forEach((cssClass) => {
					cancelButton.classList.add(cssClass)
				})
			}
			cancelButton.innerHTML = adoptedPrompt.cancelButton.value ? adoptedPrompt.cancelButton.value : "Cancel"
		} else {
			cancelButton.innerHTML = "Cancel"
		}

		// add enter key listener
		window.addEventListener("keypress", async (event) => {
			if (event.key === "Enter") {
				event.preventDefault()
				await handleButtonClick(adoptedPrompt.uuid, "_enter")
			}
		})
		

		// append each action button
		var i = 0
		adoptedPrompt.buttons.forEach((elem) => {
			var domElem = elems.bbox.appendChild(document.createElement("button"))
			domElem.setAttribute("onclick", `handleButtonClick("${adoptedPrompt.uuid}", "${elem.name}")`)
			if (elem.classes) {
				elem.classes.forEach((cssClass) => {
					domElem.classList.add(cssClass)
				})
			}
			domElem.innerHTML = elem.value
			i++
		})
		

	} else {
		logs.log("No prompt to adopt! Need to close...")
	}
}
init()
