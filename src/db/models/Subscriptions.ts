import bookshelf from "../con";

const Subscription = bookshelf.model('Subscription', {
  tableName: 'subscriptions',
});

export default Subscription;