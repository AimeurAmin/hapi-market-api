import bookshelf from "../con";

const Post = bookshelf.model('Post', {
  tableName: 'posts',
  user() {
    const that: any = this;
    return that.belongsTo('User')
  }
})

export default Post