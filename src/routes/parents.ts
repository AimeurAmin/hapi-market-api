import { getParents } from "../controllers/parents.controller";

const parents = [{
  method: 'GET',
  path: '/parents',
  handler: getParents,
}];

export default parents;