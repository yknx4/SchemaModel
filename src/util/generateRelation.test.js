import {Model} from 'objection'
import generateRelation from './generateRelation'

const model = s => `${s}✓`

const base = {
  getModel: model
}

const relation = {
  relation: 'Model.HasOneThroughRelation',
  modelClass: 'Movie',
  join: {
    from: 'Person.id',
    through: {
      from: 'Person_Movie.personId',
      to: 'Person_Movie.movieId'
    },
    to: 'Movie.id'
  }
}
describe('generateRelation', function () {
  it('should properly create a relation', () => {
    expect(generateRelation(base)(relation)).toEqual({
      modelClass: model('Movie'),
      relation: Model.HasOneThroughRelation,
      join: expect.any(Object)
    })
  })
})
