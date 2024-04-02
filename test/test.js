import { expect } from "chai"
import { app } from "electron"
import PromptManager from "../index.js"

const prompts = new PromptManager({
	devMode: true,
	resizable: true,
})

const pTemplate = {
	windowTitle: "electron-prompts",
	cancelButton: {
		classes: ["btn", "btn-secondary"],
		// value: "Lets slow'r down there partner..."
	},
	elements: [
		{
			type: "header",
			value: "Enter test value",
		},
		{
			type: "paragraph",
			value: "Add a space to the end of the default value to test changed value:",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Test input",
			classes: ["form-control"],
			value: "Add a space after me please:",
		},
	],
	buttons: [
		{
			name: "submit",
			classes: ["btn", "btn-primary"],
			value: "Save Changes",
		},
	],
}
const result = await prompts.spawn(pTemplate)

it("correct value should be returned on changed prompt", async () => {
	expect(result).to.be.an("object").that.is.not.empty
	expect(result.values.testValue).to.be.ok
	expect(result.values.testValue).to.equal("Add a space after me please: ")
	return
})

const selectTemplate = {
	...pTemplate,
	elements: [
		{
			type: "header",
			value: "Select menu test",
		},
		{
			type: "paragraph",
			value: "Select the other option in the menu and submit the form",
		},
		{
			name: "testSelect",
			type: "select",
			classes: ["form-select"],
			options: [
				{ value: "test1", text: "Test option 1" },
				{ value: "test2", text: "Test option 2", selected: true },
			],
		},
	],
}

const selectResult = await prompts.spawn(selectTemplate)

it("correct value should be returned changed select", async () => {
	expect(selectResult).to.be.ok
	expect(selectResult.values).to.be.ok
	expect(selectResult.values).to.be.ok
	console.log(selectResult.values)
	expect(selectResult.values.testSelect).to.equal("test1")
	return
})

const selectTemplate2 = {
	...pTemplate,
	elements: [
		{
			type: "header",
			value: "Select menu test",
		},
		{
			type: "paragraph",
			value: "Leave this select menu UNCHANGED then submit:",
		},
		{
			name: "testSelect",
			type: "select",
			classes: ["form-select"],
			options: [
				{ value: "test1", text: "Test option 1" },
				{ value: "test2", text: "Test option 2", selected: true },
			],
		},
	],
}

const selectResult2 = await prompts.spawn(selectTemplate2)

it("correct value should be returned UN-changed select", async () => {
	console.log(selectResult2)
	expect(selectResult2).to.be.ok
	expect(selectResult2.values).to.not.be.ok
	expect(selectResult2.values).to.not.be.ok
	expect(selectResult2.button).to.be.ok
	return
})

const cancelTemplate = {
	...pTemplate,
	elements: [
		{
			type: "header",
			value: "Test Prompt closing",
		},
		{
			type: "paragraph",
			value: "Cancel this prompt",
		},
	],
}

const result2 = await prompts.spawn(cancelTemplate)

it("correct value should be returned on cancelled prompt", async () => {
	expect(result2).to.equal(null)
	expect(result2).to.not.be.ok
	return
})

const closedTemplate = {
	...pTemplate,
	elements: [
		{
			type: "header",
			value: "Test Prompt closing",
		},
		{
			type: "paragraph",
			value: "CLOSE this prompt",
		},
	],
}

const result3 = await prompts.spawn(closedTemplate)

it("same value should be returned on a closed prompt", async () => {
	expect(result3).to.equal(null)
	expect(result3).to.not.be.ok
	return
})
