import { app } from "electron"
import fs from "node:fs"
import PromptManager from "../dist/index.js"

const pTemplates = JSON.parse(fs.readFileSync("test/test-prompts.json").toString())
const templateKeys = Object.keys(pTemplates)

app.on('ready', async () => {
	const prompts = new PromptManager({
		devMode: true,
		resizable: true,
	})
	
	const result = await prompts.spawn({
		...pTemplates.defaults,
		...pTemplates.changeValue,
	})
	console.log(result)
	console.log("test complete")
})

