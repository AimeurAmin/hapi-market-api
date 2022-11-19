import bookshelf from "../con";

const ClassTimeline = bookshelf.model('ClassTimeline', {
  tableName: 'classes_timeline',
});

export default ClassTimeline;