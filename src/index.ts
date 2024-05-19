// import { app, BrowserWindow, ipcMain } from "electron"
import { BrowserWindow, ipcMain } from "electron"

import url from "node:url"
import path from "node:path"
import events from "node:events"

import { v4 as uuidv4 } from "uuid"
import { PromptResult, PromptTemplate } from "./types.js"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
export default class PromptManager {
	adoptablePrompts: Record<string, PromptTemplate> = {}
	windows: Record<string, BrowserWindow> = {}
	options = null
	events = null
	/**
	 * `PromptManager` class
	 * ----
	 * [ github.io docs ⧉](https://pbxx.github.io/electron-prompts/docs/api/prompt-manager/)
	 *
	 * Orchestrates all spawning of prompts and returning of changed data.
	 * ***
	 * @param opts
	 * @returns the PromptManager class
	 */
	constructor(opts) {
		this.options = {
			width: 600,
			baseHeight: 138,
			resizable: false,
			devMode: false,
			promptFile: path.resolve(__dirname + "../src/static/prompt/prompt.html"),
			...opts,
		}
		this.events = new events.EventEmitter()
		ipcMain.handle("prompt:sizeUp", this.handlers.sizeUp)
		ipcMain.handle("prompt:ready", this.handlers.adopt)
		ipcMain.handle("prompt:formDone", this.handlers.formDone)
		ipcMain.handle("prompt:cancel", this.handlers.cancel)
		return
	}
	logs = {
		log: (...args) => {
			if (this.options["devMode"]) {
				console.log(...args)
			}
		},
		error: (...args) => {
			if (this.options["devMode"]) {
				console.error(...args)
			}
		},
	}
	handlers = {
		adopt: async (): Promise<PromptTemplate> => {
			this.logs.log(`prompt adopt detected...`)
			var pkeys = Object.keys(this.adoptablePrompts)
			if (pkeys.length > 0) {
				// there are prompts available to adopt
				// select then delete the first one in list
				const adoptedPrompt = {
					uuid: pkeys[0],
					...this.adoptablePrompts[pkeys[0]],
				}

				delete this.adoptablePrompts[pkeys[0]]
				return adoptedPrompt
			} else {
				// no prompts available
				// the calling prompt was spawned in error.
				// respond with null to initiate a window close on the caller
				return null
			}
		},
		sizeUp: async (event, id: string, amount: number) => {
			// size window up based on content size
			this.windows[id].setSize(this.options.width, this.options.baseHeight + amount)
		},
		formDone: async (event, id: string, data: PromptResult) => {
			// handle prompt completion
			this.events.emit("formDone", id, data)
		},
		cancel: async (event, id: string) => {
			// handle prompt cancellation
			this.events.emit("formDone", id, null)
		},
	}
	/**
	 * `spawn` method (async)
	 * ----
	 * [github.io docs ⧉](https://pbxx.github.io/electron-prompts/docs/api/prompt-manager/spawn)
	 *
	 * Spawns a prompt window given a passed `PromptTemplate`
	 * ***
	 * @param opts The `PromptTemplate` to use for creating prompt.
	 * @returns A `PromptResult` object if user completes, `null` if not.
	 *
	 */
	spawn = (opts: PromptTemplate): Promise<PromptResult | null> => {
		return new Promise<PromptResult | null>((resolve, reject) => {
			// generate a uuid for the prompt
			const uuid = uuidv4()
			// place this prompt up for adoption
			this.adoptablePrompts[uuid] = {
				devMode: this.options.devMode,
				...opts,
			}
			// spawn browser window for prompt
			this.windows[uuid] = new BrowserWindow({
				width: this.options.width,
				height: this.options.baseHeight,
				webPreferences: {
					preload: path.resolve(__dirname, "../src/static/prompt/preload.js"),
				},
				autoHideMenuBar: true,
				transparent: true,
				resizable: this.options.resizable,
				frame: false,
			})

			if (!this.options.devMode) {
				// set menu to null in prod mode
				// this will also disable the devtools Ctrl+Shift+I shortcut
				this.windows[uuid].setMenu(null)
			}

			this.windows[uuid].on("close", () => {
				// handle cancel on close
				this.events.emit("formDone", uuid, null)
				delete this.windows[uuid]
			})

			// load prompt page
			// it will "adopt" a prompt in the adoptablePrompts object, or close if none are present
			this.windows[uuid].loadFile(this.options.promptFile)

			const doneHandler = (id, data) => {
				if (id === uuid) {
					// this is our prompt's response
					this.logs.log(id, data)
					remListener()
					if (data !== null) {
						// prompt wasn't cancelled, resolve with data

						resolve({
							...data,
						})
					} else {
						// prompt was cancelled, resolve with null
						resolve(null)
					}
				}
			}
			const remListener = () => {
				this.events.removeListener("formDone", doneHandler)
			}
			this.events.on("formDone", doneHandler)
		})
	}
}
