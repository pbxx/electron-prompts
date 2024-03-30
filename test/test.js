import { expect } from "chai"
import { app } from "electron"
import PromptManager from "../index.js"

const prompts = new PromptManager({
	devMode: true,
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

const cancelTemplate = {
	...pTemplate,
	elements: [
		{
			type: "header",
			value: "Test Prompt cancellation",
		},
		{
			type: "paragraph",
			value: "CANCEL this prompt",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Test input",
			classes: ["form-control"],
			value: "You do not want to enter this value and you are pressing cancel...",
		},
	]
}

const cancelTemplate2 = {
	...pTemplate,
	elements: [
		{
			type: "header",
			value: "The easiest prompts ever!",
		},
		{
			type: "paragraph",
			value: "An easy tool to enable spawning prompts from the Electron main process",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Test input",
			classes: ["form-control"],
			value: "With inputs!",
		},
		{
			type: "paragraph",
			value: "Also paragraphs",
		},
		{
			name: "testValue",
			type: "input",
			placeholder: "Or even another input!",
			classes: ["form-control"],
			value: "",
		},
	]
}

const result2 = await prompts.spawn(cancelTemplate2)

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
		}
	]
}

const result3 = await prompts.spawn(closedTemplate)

it("same value should be returned on a closed prompt", async () => {
	expect(result3).to.equal(null)
	expect(result3).to.not.be.ok
	return
})