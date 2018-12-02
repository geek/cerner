'use strict';

const Fs = require('fs');
const Path = require('path');
const Graphi = require('graphi');
const Hapi = require('hapi');
const RandomName = require('random-name');


const schema = Fs.readFileSync(Path.join(__dirname, 'schema1.gql'), 'utf8');

const resolvers = {
  getUser: ({ email }) => {
    return {
      email,
      firstname: RandomName.first(),
      lastname: RandomName.last()
    }
  }
};

const main = async () => {
  const server = Hapi.server({ port: 8080 });

  await server.register({ plugin: Graphi, options: { schema, resolvers } });
  await server.start();
  console.log('server started at http://localhost:8080');
};

main();

