import SchemaModel from './SchemaModel'
export default function fromSchema (schema) {
  logger.info(`Creating Model for ${schema.title}`)
  const klass = class extends SchemaModel {
    static get jsonSchema () {
      return schema
    }
  }

  Object.defineProperty(klass, 'name', {value: schema.title})
  SchemaModel.$models[schema.title] = klass
  return klass
}
