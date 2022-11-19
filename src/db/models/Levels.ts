import bookshelf from "../con";

const Level = bookshelf.model('Level', {
  tableName: 'levels',
});

export default Level;