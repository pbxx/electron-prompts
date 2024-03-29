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
	
	// expect(results).to.be.an("array").that.is.not.empty
	// console.log(result)
	expect(result.values.testValue).to.be.ok
	expect(result.values.testValue).to.equal("Add a space after me please: ")
	return
})
