import {Model} from 'objection'
import pluralize from 'pluralize'
import {snakeCase} from 'lodash'

export default class SchemaModel extends Model {
  static get models () {
    return this.$models
  }
  static get tableName () {
    return snakeCase(pluralize(this.jsonSchema.title))
  }
}

SchemaModel.$models = []
