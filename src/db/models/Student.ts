import bookshelf from "../con";
import Parent from "./Parents";

const { Model } = bookshelf

class Student extends Model<Student> {
  get tableName() { return 'students'; }
  parent() { return this.belongsTo(Parent); }
}

export default Student;