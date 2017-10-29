import dotenv from 'dotenv'
import callsites from 'callsites'
import debug from 'debug'
import {inspect} from 'util'
import {isString} from 'lodash'
dotenv.config()

const loggerFn = prefix => debug('SchemaModel' + prefix)
const baseLogger = loggerFn()

export const logger = {
  info (...args) {
    if (!baseLogger.enabled) {
      return
    }
    const caller = callsites()[1]
    const prefix = caller.getFileName().replace(process.env.PWD + '/src', '').split('/').join('::')
    const transformFn = arg => isString(arg) ? arg : inspect(arg)
    const line = caller.getLineNumber()
    const payload = [
      `L${line}:`,
      ...args
    ]
    loggerFn(prefix)(payload.map(transformFn).join(' '))
  }
}
