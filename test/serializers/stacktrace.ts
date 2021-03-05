type Serializer = Parameters<typeof expect.addSnapshotSerializer>['0']

const EXPRESSION = /(\s*at .*(\n|$))+/gm
const PLACEHOLDER = '\n    <stack>:X:X'

const serializer: Serializer = {
  serialize(val) {
    return typeof val === 'string' ? val.replace(EXPRESSION, PLACEHOLDER) : val
  },

  test(val) {
    return typeof val === 'string' && EXPRESSION.test(val)
  },
}

export default serializer
