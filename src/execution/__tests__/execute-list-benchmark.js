// @flow strict

import { parse } from '../../language/parser';
import { execute } from '../execute';
import { buildSchema } from '../../utilities/buildASTSchema';

const schema = buildSchema(
  `
  type Query {
    getList: [Result]
  }

  type Result {
    fieldOne: String
    fieldTwo: Int
    fieldThree: Float
    nested: [Nested]
  }

  type Nested {
    fieldOne: String
    fieldTwo: Int
    fieldThree: Float
  }
`,
  { assumeValid: true },
);
const document = parse(`
  query getList {
    getList {
      fieldOne
      fieldTwo
      fieldThree
      nested {
        fieldOne
        fieldTwo
        fieldThree
      }
    }
  }
`);

const nested = {
  fieldOne: 'one',
  fieldTwo: 2,
  fieldThree: 3.0,
};

const result = {
  fieldOne: 'one',
  fieldTwo: 2,
  fieldThree: 3.0,
  nested: Array(100).fill(nested),
};

const rootValue = {
  getList: Array(100).fill(result),
};

export const name = 'Execute List Query';
export const count = 10;
export function measure() {
  execute({ schema, document, rootValue });
}
