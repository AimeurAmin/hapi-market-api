import bookshelf from "../con";
import Student from "./Student";

const { Model } = bookshelf;

class Parent extends Model<Parent> {
  get tableName() { return 'parents'; }
  students() { return this.hasMany(Student); }
}

export default Parent;