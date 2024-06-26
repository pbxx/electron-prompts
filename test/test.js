import { app } from "electron"
import fs from "node:fs"
import PromptManager from "../dist/index.js"
import { expect } from "chai"
import Logger from "../dist/logger.js"

var options

// const expect = await import("chai").expect

const prompts = new PromptManager({
	devMode: true,
	resizable: true,
})

const logs = new Logger({
	logLevel: 6,
})

const pTemplates = JSON.parse(fs.readFileSync("test/test-prompts.json").toString())
const templateKeys = Object.keys(pTemplates)

const tests = {
	changeValue: async () => {
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
	},
	changeSelect: async () => {
		const result = await prompts.spawn({
			...pTemplates.defaults,
			...pTemplates.changeSelect,
		})

		it("correct value should be returned changed select", async () => {
			expect(result).to.be.ok
			expect(result.values).to.be.ok
			expect(result.values).to.be.ok
			logs.log(5, result.values)
			expect(result.values.testSelect).to.equal("test1")
			return
		})
	},
	changeValueWithType: async () => {
		
		const result = await prompts.spawn( {
			...pTemplates.defaults,
			...pTemplates.changeValueWithType,
		})

		it("correct value should be returned on changed prompt with inputType specified", async () => {
			expect(result).to.be.an("object").that.is.not.empty
			expect(result.values.testValue).to.be.ok
			logs.log(5, result.values)
			expect(result.values.testValue).to.not.equal(pTemplates.changeValueWithType.elements[2].value)
			return
		})
	},
	changeValueTel: async () => {
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
	},
	dontChangeSelect: async () => {
		const selectResult2 = await prompts.spawn({
			...pTemplates.defaults,
			...pTemplates.dontChangeSelect,
		})

		it("correct value should be returned UN-changed select", async () => {
			logs.log(5, selectResult2)
			expect(selectResult2).to.be.ok
			expect(selectResult2.values).to.not.be.ok
			expect(selectResult2.values).to.not.be.ok
			expect(selectResult2.button).to.be.ok
			return
		})
	},
	cancelPrompt: async () => {
		const result2 = await prompts.spawn({
			...pTemplates.defaults,
			...pTemplates.cancelPrompt,
		})

		it("correct value should be returned on cancelled prompt", async () => {
			expect(result2).to.equal(null)
			expect(result2).to.not.be.ok
			return
		})
	},
	closePrompt: async () => {
		const result3 = await prompts.spawn({
			...pTemplates.defaults,
			...pTemplates.closePrompt,
		})

		it("same value should be returned on a closed prompt", async () => {
			expect(result3).to.equal(null)
			expect(result3).to.not.be.ok
			return
		})
	},
}

const run = async () => {
	
	// logs.log(5, pTemplates)
	if ("only" in options) {
		// await runPromptTest(options.only)
		await tests[options.only]()
	} else {
		for (var key of templateKeys) {
			// logs.log(5, key)
			// await runPromptTest(key)
			if (key in tests) {
				await tests[key]()
			}
		}
	}
}

const parseArgs = async () => {
	
	var options = {}
	// logs.log(5, process.argv)
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

const setup = async () => {
	// logs.log(5, "I am actually starting")
	options = await parseArgs()
	logs.log(5, "Optional arguments:", options)

	await run()
	logs.log(5, "test complete")
}


await setup()
logs.log(5, "test complete")

// app.whenReady().then(setup)
// run()
// .then(() => {
// 	logs.log(5, "test complete")
// })
// .catch((err) => {
// 	console.error(err)
// })

// app.on("ready", async () => {
// 	logs.log(5, "I am actually starting")
// 	options = await parseArgs()
// 	logs.log(5, options)

// 	await run()
// 	logs.log(5, "test complete")
// })

