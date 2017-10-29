import fromSchema from './fromSchema'
import personSchema from '../Person.json'

describe('fromSchema', function () {
  it('should memoize result', () => {
    const Person1 = fromSchema(personSchema)
    const Person2 = fromSchema(personSchema)
    expect(Person1).toBe(Person2)
  })
})
