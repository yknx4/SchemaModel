import {Model} from 'objection'
import pluralize from 'pluralize'
import {snakeCase, mapValues, memoize} from 'lodash'
import generateRelation from './util/generateRelation'

const tableize = name => snakeCase(pluralize(name))

function bareModel (name) {
  const bareModel = class extends Model {}
  Object.defineProperty(bareModel, 'name', {value: name})
  Object.defineProperty(bareModel, 'tableName', {value: tableize(name)})
  return bareModel
}

const mBareModel = memoize(bareModel)

export default class SchemaModel extends Model {
  static getModel (name) {
    const existingModel = this.$models[name]
    if (existingModel != null) return existingModel
    return mBareModel(name)
  }

  static get tableName () {
    return tableize(this.jsonSchema.title)
  }

  static get relationMappings () {
    const {'x-relations': relations} = this.jsonSchema
    return mapValues(relations, this.generateRelation)
  }
}

SchemaModel.generateRelation = memoize(generateRelation(SchemaModel))

SchemaModel.$models = []
