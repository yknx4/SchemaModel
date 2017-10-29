import {Model} from 'objection'
import {omitBy} from 'lodash'
export default Base => function generateRelation (data) {
  const {modelClass, relation, join, to} = data
  return omitBy({
    relation: Model[relation.replace('Model.', '')],
    modelClass: Base.getModel(modelClass),
    join,
    to
  }, v => v == null)
}
