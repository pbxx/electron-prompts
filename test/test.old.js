import { app } from "electron"
import PromptManager from "../index.js"
async function init() {
	const prompts = new PromptManager({
		devMode: true,
	})

	const result = await prompts.spawn({
		windowTitle: "electron-prompts",
		cancelButton: {
			classes: ["btn", "btn-secondary"],
			// value: "Lets slow'r down there partner..."
		},
		elements: [
			{
				type: "header",
				value: "Change display name",
			},
			{
				type: "paragraph",
				value: "Enter a new display name below:",
			},
			{
				name: "displayName",
				type: "input",
				placeholder: "Test Time",
				classes: ["form-control"],
				value: "Username",
			},
		],
		buttons: [
			{
				name: "submit",
				classes: ["btn", "btn-primary"],
				value: "Save Changes",
			},
		],
	})
	logs.log("prompt completed", result)
}
app.whenReady().then(init)
