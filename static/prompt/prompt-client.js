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
	if (formState) {
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
		adoptedPrompt.elements.forEach((elem) => {
			// append each form element
			switch (elem.type) {
				case "header": {
					var pElem = elems.ebox.appendChild(document.createElement("h4"))
					pElem.innerHTML = elem.value
					if (elem.classes) {
						elem.classes.forEach((cssClass) => {
							pElem.classList.add(cssClass)
						})
					}
					break
				}
				case "paragraph": {
					var pElem = elems.ebox.appendChild(document.createElement("p"))
					pElem.innerHTML = elem.value
					if (elem.classes) {
						elem.classes.forEach((cssClass) => {
							pElem.classList.add(cssClass)
						})
					}
					break
				}
				case "input": {
					var pElem = elems.ebox.appendChild(document.createElement("input"))
					const thisIndex = elem.name
					formStateDefaults[thisIndex] = elem.value
					if (elem.classes) {
						elem.classes.forEach((cssClass) => {
							pElem.classList.add(cssClass)
						})
					}
					pElem.setAttribute("placeholder", elem.placeholder ? elem.placeholder : `Original value: ${elem.value}`)
					pElem.value = elem.value
					pElem.setAttribute("id", `form-${thisIndex}`)
					pElem.setAttribute("onkeyup", `updateForm("${thisIndex}")`)
					break
				}
			}
		})
		// set changable state to assembled defaults
		/*
		formState = {
			...formStateDefaults,
		}
        */

		// size window up based on element content height
		await window.electronAPI.sizeUp(adoptedPrompt.uuid, elems.ebox.scrollHeight)

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
			var bElem = elems.bbox.appendChild(document.createElement("button"))
			bElem.setAttribute("onclick", `handleButtonClick("${adoptedPrompt.uuid}", "${elem.name}")`)
			if (elem.classes) {
				elem.classes.forEach((cssClass) => {
					bElem.classList.add(cssClass)
				})
			}
			bElem.innerHTML = elem.value
			i++
		})
		

	} else {
		logs.log("No prompt to adopt! Need to close...")
	}
}
init()
