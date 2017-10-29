import dotenv from 'dotenv'
import callerCallsite from 'caller-callsite'
import debug from 'debug'
import {inspect} from 'util'
import {isString} from 'lodash'
import chalk from 'chalk'
dotenv.config()

const loggerFn = prefix => debug('SchemaModel' + prefix)
const baseLogger = loggerFn()

global.logger = {
  info (...args) {
    if (!baseLogger.enabled) {
      return
    }
    const caller = callerCallsite()
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