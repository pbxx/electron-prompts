import { expect } from "chai"
import { app } from "electron"
import fs from "node:fs"
import PromptManager from "../index.js"

var options

const prompts = new PromptManager({
	devMode: true,
	resizable: true,
})

const pTemplates = JSON.parse(fs.readFileSync("test/test-prompts.json"))
const templateKeys = Object.keys(pTemplates)

const runPromptTest = async (key) => {
	switch (key) {
		case "changeValue": {
			const result = await prompts.spawn({
				...pTemplates.defaults,
				...pTemplates.changeValue,
			})

			it("correct value should be returned on changed prompt", async () => {
				expect(result).to.be.an("object").that.is.not.empty
				expect(result.values.testValue).to.be.ok
				expect(result.values.testValue).to.equal("Add a space after me please: ")
				return
			})
			break
		}
		case "changeValueTel": {
			const result = await prompts.spawn({
				...pTemplates.defaults,
				...pTemplates.changeValueTel,
			})

			it("correct value should be returned on changed prompt with inputType specified", async () => {
				expect(result).to.be.an("object").that.is.not.empty
				expect(result.values.testValue).to.be.ok
				expect(result.values.testValue).to.equal("Add a space after me please: ")
				return
			})
			break
		}
		case "changeSelect": {
			const result = await prompts.spawn({
				...pTemplates.defaults,
				...pTemplates.changeSelect,
			})

			it("correct value should be returned changed select", async () => {
				expect(result).to.be.ok
				expect(result.values).to.be.ok
				expect(result.values).to.be.ok
				console.log(result.values)
				expect(result.values.testSelect).to.equal("test1")
				return
			})
			break
		}
		case "dontChangeSelect": {
			const selectResult2 = await prompts.spawn({
				...pTemplates.defaults,
				...pTemplates.dontChangeSelect,
			})

			it("correct value should be returned UN-changed select", async () => {
				console.log(selectResult2)
				expect(selectResult2).to.be.ok
				expect(selectResult2.values).to.not.be.ok
				expect(selectResult2.values).to.not.be.ok
				expect(selectResult2.button).to.be.ok
				return
			})
			break
		}
		case "cancelPrompt": {
			const result2 = await prompts.spawn({
				...pTemplates.defaults,
				...pTemplates.cancelPrompt,
			})

			it("correct value should be returned on cancelled prompt", async () => {
				expect(result2).to.equal(null)
				expect(result2).to.not.be.ok
				return
			})
			break
		}
		case "closePrompt": {
			const result3 = await prompts.spawn({
				...pTemplates.defaults,
				...pTemplates.closePrompt,
			})

			it("same value should be returned on a closed prompt", async () => {
				expect(result3).to.equal(null)
				expect(result3).to.not.be.ok
				return
			})
			break
		}
		// case "": {

		// }
	}
	return
}

const parseArgs = async () => {
	var options = {}
	for (var arg of process.argv) {
		// iterate through all args
		if (arg.includes("--")) {
			// this is an option argument
			var splitArg = arg.split("=")
			if (splitArg.length > 1) {
				// this is an option with a value
				const val = splitArg[1].replace('"', "").replace("'", "")
				const key = splitArg[0].replace("--", "")
				options[key] = val
			} else {
				// this is a option has no value
				const key = splitArg[0].replace("--", "")
				options[key] = true

			}
		}
	}
	return options
}

const run = async () => {
	// console.log(pTemplates)
	if ("only" in options) {
		await runPromptTest(options.only)
	} else {
		for (var key of templateKeys) {
			// console.log(key)
			// console.log(key)
			await runPromptTest(key)
		}
	}
}

options = await parseArgs()
console.log(options)
await run()
