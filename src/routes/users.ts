import { getUser, getUsers, login, me, register } from "../controllers/user.controller";
import Joi from 'joi';

const users = [{
  method: 'GET',
  path: '/me',
  handler: me
},{
  method: 'GET',
  path: '/',
  handler: getUsers
}, {
  method: 'GET',
  path: '/{id}',
  handler: getUser
}, {
  method: 'POST',
  path: '/login',
  config: {
    auth: false,
    validate: {
      payload: Joi.object({
        username: Joi.string().min(1).max(10).required(),
        password: Joi.string().min(1).required(),
      }),
    },
  },
  handler: login,
}, {
  method: 'POST',
  path: '/register',
  config: {
    auth: false,
    validate: {
      payload: Joi.object({
        first_name: Joi.string().min(1).max(10),
        last_name: Joi.string().min(1).max(10),
        email: Joi.string().email().required().required(),
        username: Joi.string().min(1).max(10).required(),
        password: Joi.string().min(1).required(),
      }),
    },
  },
  handler: register,
}];

export default users;