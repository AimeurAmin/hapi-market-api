import { addPost, getMyPosts, getPosts, updatePost } from "../controllers/posts.controller";

const config = {
  payload:  {
    maxBytes: 1024 * 1024 * 100,
    // timeout: false, // important
    output: 'data',
    allow: 'multipart/form-data',
    multipart: true
  },
}

const posts = [{
  method: 'GET',
  path: '/posts',
  handler: getPosts,
}, {
  method: 'POST',
  path: '/posts',
  config,
  handler: addPost
}, {
  method: 'GET',
  path: '/myPosts',
  handler: getMyPosts
}, {
  method: 'PUT',
  path: '/posts/{id}',
  config,
  handler: updatePost
}, {
  method: 'GET',
  path: '/uploads/{pic}',
  handler:  function (request: any, h: any) {
    return h.file(request.params.pic);
  }
}];

export default posts;