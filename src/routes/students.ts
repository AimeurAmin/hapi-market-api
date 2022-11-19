import { getStudents } from "../controllers/students.controller";

const students = [{
  method: 'GET',
  path: '/students',
  handler: getStudents,
}];

export default students;