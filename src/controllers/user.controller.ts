import { Request, ResponseToolkit } from "hapi"
import User from "../db/models/User"
import bcrypt from 'bcrypt';
import createToken from '../utils/createToken';
import hashPassword from "../utils/hashPassword";


export const me = async (req: Request, h: ResponseToolkit, err?: Error) => {
  const currentUser: any = req.auth.credentials
  const userData = await User.collection().where('id', currentUser.id).fetch({withRelated: ['posts']})
  const {password, ...rest} = userData.toJSON()[0];
  return rest;
}

export const getUsers = async (request: Request, h: ResponseToolkit, err?: Error) => {
  const users = await User.collection().fetch({ withRelated: ['posts'] });

  const passwordRemovedUsers = users.toJSON().map(user => {
    const {password, ...rest} = user
    return rest;
  })
  return h.response(passwordRemovedUsers)
}

export const getUser = async (request: Request, h: ResponseToolkit, err: Error) => {
  try {
    const userResult = await User.collection().where('id', request.params.id).fetchOne()
    const {password, ...user} = userResult.toJSON();
    
    return h.response(user);
    
  } catch (error: any) {
    return error.message
  }
}

export const login = (req: Request, reply: ResponseToolkit) => {
  const { username, password }: any = req.payload;
  
  return User.collection().where('username', username ).fetchOne()
    .then((userDetails: any) => {
      const user = userDetails.toJSON();
      
      if (user) {
        const isCorrect = bcrypt.compareSync(password, user.password);
        if (isCorrect) {
          const data = {
            token: createToken(user),
          };
          return reply.response(data).code(200);
        }
        return reply.response({ message: 'Invalid Username or Password!' }).code(400);
      }
      return reply.response({ message: 'Invalid Username or Password!' }).code(400);
    });
}

export const register = (req: Request, h: ResponseToolkit) => {
  const {
    first_name, last_name, email, username, password,
  }: any = req.payload;
  return hashPassword(password).then((passwordHash) => {
    const insertIntoDB = {
      first_name,
      last_name,
      email,
      username,
      password: passwordHash,
    };
    return User.collection().where((queryBuilder: any) => {
      queryBuilder
          .where({ 'email': email })
          .orWhere({ 'username': username })
      }).fetch().then((userExists: any) => {
      const jsonUsersExists = userExists.toJSON();
      if (jsonUsersExists.length === 0) {
        return new User(insertIntoDB).save()
        // .tap(student =>
        //   Promise.map(courses, course => student.related('courses').create(course))
        // )
        .then(student =>
          h.response(student).code(200)
        ).catch((error: any) =>
          h.response(error.message).code(500)
        );
      }

      const responseString = (jsonUsersExists[0].username === username) ? 'User Name already taken' : 'Email already registered';
      return h.response({ message: responseString }).code(400);
    });
  });
}