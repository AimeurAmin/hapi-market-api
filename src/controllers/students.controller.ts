import { Request, ResponseToolkit } from "hapi";
import Student from "../db/models/Student";

// GET
export const getStudents = async (request: Request, h: ResponseToolkit, err?: Error) => {
  console.log('here');
  
  const students = await Student.collection().fetch({withRelated: ['parent']}).then((students: any) => {
    return students;
  }).catch((err: any) => {
    console.error(err.message);
    return err.message;
  });
  
  return h.response(students)
}
