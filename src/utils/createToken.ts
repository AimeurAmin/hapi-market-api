const jwt = require('jsonwebtoken');

const secretKey = 'topSecretKey_ToBePutInFileInProductionEnv';

const createToken = (user: any) => jwt.sign({
  id: user.id,
  userName: user.username,
}, secretKey, { expiresIn: '1h', algorithm: 'HS256' });

export default createToken;