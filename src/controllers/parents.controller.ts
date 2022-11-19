import { Request, ResponseToolkit } from "hapi";
import Parent from "../db/models/Parents";

// GET
export const getParents = async (request: Request, h: ResponseToolkit, err?: Error) => {
  
  const parents = await Parent.collection().fetch({withRelated: ['students']}).then((parents: any) => {
    return parents;
  }).catch((err: any) => {
    console.error(err.message);
    return err.message;
  });
  
  return h.response(parents)
}
