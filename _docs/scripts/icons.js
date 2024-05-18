const { exec } = require("node:child_process")
const path = require("node:path")
const util = require("node:util")
// const sprom = require("spreadprom")

// promisify exec
const execPromise = util.promisify(exec)

async function main() {
    const sprom = (await import("spreadprom")).default
	// this is necessary cause npm scripts can't check platform
	console.log(process.argv)
	console.log(process.platform)
	if (process.platform == "win32") {
		await makeIcon(process.platform, "icon.svg")

		console.log("done")
	}
}

async function makeIcon(platform, filename) {
    const sprom = (await import("spreadprom")).default
	const file = {
		name: filename.split(".")[0],
		extension: "." + filename.split(".")[1],
	}
	console.log(file)
	switch (platform) {
		case "win32": {
			const command = `call "${path.resolve("scripts/makeIcons.bat")}" "${path.resolve("src/static/img/" + file.name + file.extension)}" "${path.resolve("src/static/img/" + file.name + ".ico")}"`
			var [err, stdout, stderr] = await sprom(execPromise(command))
			if (err) {
				throw `exec error: ${err}`
			}
			if (stderr && !stderr.includes("Can't use '--export-filename'")) {
				// an error occurred
				console.error(`stderr: ${stderr}`)
			}
		}
	}
}

main()
