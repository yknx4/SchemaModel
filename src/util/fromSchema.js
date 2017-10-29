import SchemaModel from '../SchemaModel'

const {logger} = global.SchemaModel.config
export default function fromSchema (schema) {
  const {title} = schema
  if (SchemaModel.$models[title] != null) {
    return SchemaModel.getModel(title)
  }
  logger.info(`Creating Model for ${title}`)
  const klass = class extends SchemaModel {
    static get jsonSchema () {
      return schema
    }
  }

  Object.defineProperty(klass, 'name', {value: title})
  SchemaModel.$models[title] = klass
  return klass
}
