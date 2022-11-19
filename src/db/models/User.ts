import bookshelf from "../con";
import Post from "./Post";
const { Model } = bookshelf;

class User extends Model<User> {
  get tableName() { return 'users'; }

  posts() { return this.hasMany(Post); }
}

export default User;

