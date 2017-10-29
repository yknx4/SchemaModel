import SchemaModel from './SchemaModel'
import fromSchema from './util/fromSchema'
import personSchema from './Person.json'
import {Model} from 'objection'

const Person = fromSchema(personSchema)

describe('SchemaModel', function () {
  it('should infer titlename by snaking and pluralizing', () => {
    expect(Person.tableName).toEqual('people')
  })

  it('should generate relations if available', () => {
    const relations = Person.relationMappings
    expect(relations).toEqual({
      pets: {
        join: expect.any(Object),
        modelClass: SchemaModel.getModel('Animal'),
        relation: Model.HasManyRelation
      },
      movies: {
        join: expect.any(Object),
        modelClass: SchemaModel.getModel('Movie'),
        relation: Model.ManyToManyRelation
      },
      children: {
        modelClass: Person,
        relation: Model.HasManyRelation,
        join: expect.any(Object)
      },
      parent: {
        join: expect.any(Object),
        modelClass: Person,
        relation: Model.BelongsToOneRelation
      }
    })
  })

  describe('getModel', function () {
    it('should fetch existing model', () => {
      expect(SchemaModel.getModel('Person')).toBe(Person)
    })

    it('should memoize', () => {
      const Book = SchemaModel.getModel('Book')
      expect(SchemaModel.getModel('Book')).toEqual(Book)
    })

    it('should generate a bare model infered by name', () => {
      const Book = SchemaModel.getModel('Book')
      expect(Book.tableName).toEqual('books')
    })
  })
})
