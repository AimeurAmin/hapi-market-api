import { Request, ResponseToolkit } from "hapi";
import Post from "../db/models/Post";
import handleFileUpload from "../utils/handleFileUpload";
import { v4 as uuid } from 'uuid';

// GET
export const getPosts = async (request: Request, h: ResponseToolkit, err?: Error) => {
  
  const posts = await Post.fetchAll().then((posts: any) => {
    return posts;
  }).catch((err: any) => {
    console.error(err.message);
    return err.message;
  });
  
  return h.response(posts)
}

export const getMyPosts = async(req: Request, h: ResponseToolkit, err?: Error) => {
 
  const {id: userId}: any = req.auth.credentials 
  const posts: any = await Post.collection().where('user_id', userId).fetch();

  return h.response(posts).code(200);
}

//POST
export const addPost = async (req: Request, h: ResponseToolkit, err?: Error) => {
  const { title, body, file }: any = req.payload;
  const {id: userId}: any = req.auth.credentials 
  
  try {

    const generatedFileName = uuid();
    //uploads the image.
    await handleFileUpload(file, generatedFileName)

    const post = await new Post({title, body, user_id: userId, image: `${generatedFileName}.png`});

    post.save();

    return h.response(post).code(201)
  } catch (error: any) {
    return h.response(error.message).code(500)
  }
}

//UPDATE
export const updatePost = async (req: Request, h: ResponseToolkit, err?: Error) => {
  try {
    const {file, ...updateData}: any = req.payload;
    const post_id = req.params.id;
    const {id: user_id}: any = req.auth.credentials 
    const post = await Post.collection().where(((queryBuilder: any) => {
      queryBuilder
            .where({ 'id': post_id, user_id })
    })).fetchOne().then(result => result).catch(err => {
      return undefined;
    });

    if(!post) {
      return h.response({statusCode: 404, error: 'Bad request', message: 'Post not found or the current user is not the owner of the post'}).code(404);
    };

    if(file) {
      const generatedFileName = uuid(); //generates random name for the file
      //uploads the image.
      await handleFileUpload(file, generatedFileName); //actually uploading the file (image)
      updateData['image'] = `${generatedFileName }.png`
    }
    const updatedPost = await post?.save({...updateData }, {patch: true})

    return h.response(updatedPost).code(200);

  } catch (error: any) {
    
    return h.response({statusCode: 400, error: 'bad request', message: 'bad request'}).code(400)
  }
}