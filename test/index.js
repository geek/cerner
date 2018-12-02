'use strict';

const Fs = require('fs');
const Path = require('path');
const Code = require('code');
const Lab = require('lab');
const Tester = require('easygraphql-tester');

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;

const schema = Fs.readFileSync(Path.join(__dirname, '../schema.gql'), 'utf8');

it('can create a user', () => {
  const tester = new Tester(schema);

  const mutation = `mutation
    createUser($email: String! $firstname: String! $lastname: String!) {
      createUser(user: { email: $email firstname: $firstname lastname: $lastname })
      { id }
    }`;

  const input = { email: 'test@test.com', firstname: 'foo', lastname: 'bar' };

  const result = tester.mock(mutation, input);
  expect(result.id).to.exist();
});
