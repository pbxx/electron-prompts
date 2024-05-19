// process["FORCE_COLOR"] = 3
import ansis from "ansis"

export default class Logger {
    options: Record<string, any>
    constructor(opts?: Record<string, any>) {
        this.options = {
            logLevel: 3,
            ...opts
        }
    }
    levelTextFromInt = (level): string => {
        if (level <= 0) {
            //mandatory logs
            return null
        } else if (level === 1) {
            //log level 1, fatal
            return ansis.bold.black.bgRed(`[FATAL]`)
        } else if (level === 2) {
            //log level 2, error
            return ansis.bold.red("[ERROR]")
        } else if (level === 3) {
            //log level 3, warn
            return ansis.bold.yellow("[WARN]")
        } else if (level === 4) {
            //log level 4, info
            return ansis.bold.cyan("[INFO]")
        } else if (level === 5) {
            //log level 5, debug
            return ansis.bold.blue(`[DEBUG]`)
        } else if (level >= 6) {
            //log level 6 or greater, trace
            return ansis.bold.white("[TRACE]")
        }
    }
    log = (...args:Array<any>):any => {
        //level based logging
        if (args[0] <= this.options.logLevel) {
            //logs.log this
            const levelText = this.levelTextFromInt(args[0])

            args.shift()
            return args[0] === 0 ? console.log(...args) : console.log(levelText, ...args)
        }
    }
    error = (...args:Array<any>) => {
        //level based logging
        if (args[0] <= this.options.logLevel) {
            //logs.log this
            const levelText = this.levelTextFromInt(args[0])

            args.shift()
            return console.error(levelText, ...args)
        }
    }
}