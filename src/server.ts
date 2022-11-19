'use strict';

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import Jwt from 'hapi-auth-jwt2';
import path from "path";
import parents from "./routes/parents";
import posts from "./routes/posts";
import students from "./routes/students";

import users from "./routes/users";
import validate from "./utils/validate";
const Inert = require('@hapi/inert');
export let server: Server;

export const init = async function(): Promise<Server> {
  server = Hapi.server({
      port: process.env.PORT || 5000,
      host: '0.0.0.0',
      routes: {
        files: {
            relativeTo: path.join(__dirname, 'uploads')
        }
    }
  });

  await server.register(Inert);

  await server.register(Jwt); // register jwt with Hapi
  server.auth.strategy('jwt', 'jwt', {
    key: 'topSecretKey_ToBePutInFileInProductionEnv', // secret key, define your own, or get from Auth0
    validate, // the function which validates the token
    verifyOptions: {
      algorithm: ['HS256'], // algorithm used to sign the token
    },
  });
  server.auth.default('jwt');

  // Routes
  server.route([
    ...users,
    ...posts,
    ...students,
    ...parents
  ]);
  
  return server;
};

export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});