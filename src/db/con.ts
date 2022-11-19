import Knex from 'knex';
import Bookshelf from 'bookshelf';
// Setting up the database connection
console.log('ok');

const knex: any = Knex({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '499123',
    database : 'school-manager',
    charset  : 'utf8'
  }
});

const bookshelf = Bookshelf(knex);

export default bookshelf;