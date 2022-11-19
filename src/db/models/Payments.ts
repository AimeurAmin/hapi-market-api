import bookshelf from "../con";

const Payment = bookshelf.model('Payment', {
  tableName: 'payments',
});

export default Payment;