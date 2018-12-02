'use strict';

const Fs = require('fs');
const Path = require('path');
const Graphi = require('graphi');
const Hapi = require('hapi');
const RandomName = require('random-name');

const schema = Fs.readFileSync(Path.join(__dirname, 'schema2.gql'), 'utf8');

const routes = {
  method: 'POST',
  path: '/getUser',
  config: {
    tags: ['graphql'],
    handler: (request) => {
      return {
        id: 'foo',
        email: request.payload.email,
        firstname: RandomName.first(),
        lastname: RandomName.last()
      }
    }
  }
};

const resolvers = {
  User: {
    address: function (user) {
      return {
        lineone: RandomName.place(),
        linetwo: null,
        state: 'MO',
        zipcode: '64155'
      }
    }
  }
}

const main = async () => {
  const server = Hapi.server({ port: 8080 });

  server.route(routes);
  await server.register({ plugin: Graphi, options: { schema, resolvers } });
  await server.start();
  console.log('server started at http://localhost:8080');
};

main();

