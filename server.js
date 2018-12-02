'use strict';

const Fs = require('fs');
const Path = require('path');
const Boom = require('boom');
const Graphi = require('graphi');
const Hapi = require('hapi');
const Inert = require('inert');
const _ = require('lodash');
const RandomName = require('random-name');

const schema = Fs.readFileSync(Path.join(__dirname, 'schema.gql'), 'utf8');

const users = [];

const routes = [{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true,
        }
    }
  },
  {
    method: 'POST',
    path: '/getUser',
    config: {
      tags: ['graphql'],
      handler: (request) => {
        const user = _.find(users, { id: request.payload.id });
        return user || Boom.notFound();
      }
    }
  },
  {
    method: 'POST',
    path: '/getUsers',
    config: {
      tags: ['graphql'],
      handler: (request) => {
        return users;
      }
    }
  },
  {
    method: 'POST',
    path: '/createUser',
    config: {
      tags: ['graphql'],
      handler: (request) => {
        const user = { id: _.uniqueId(), ...request.payload.user };
        users.push(user);

        return user;
      }
    }
  }
];

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
  const server = Hapi.server({
    port: 8080,
    routes: {
      cors: {
        origin: ['*']
      },
      files: {
        relativeTo: Path.join(__dirname, 'client', 'dist')
      }
    }
  });

  await server.register([
    Inert,
    { plugin: Graphi, options: { schema, resolvers } }
  ]);
  server.route(routes);

  await server.start();
  console.log('server started at http://localhost:8080');
};

main();

