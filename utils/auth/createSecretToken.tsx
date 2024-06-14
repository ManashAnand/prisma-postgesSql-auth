
import jwt from 'jsonwebtoken'

const createSecretToken = (id: number) => {
  return jwt.sign({ id }, process.env.NEXT_PUBLIC_TOKEN_KEY ?? "", {
    expiresIn: 3 * 24 * 60 * 60,
  });
  
};
export default createSecretToken;