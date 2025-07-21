import jwt from 'jsonwebtoken';

export const jwtAuth = (req) => {
  const token = req.header('Authorization');
  if (!token) {
    throw new Error('Authorization token is missing');
  }
  if (token.startsWith('Bearer ') == false) {
    throw new Error('Authorization token should start with Bearer');
  }
  const jwtToken = token.substring(7, token.length);
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || '');
    req.user = decoded;
  } catch (err) {
    throw new Error('Invailid Token');
  }
};
