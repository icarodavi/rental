import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '15144830f036cbffe20da0e868c4c10b'
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new Error("User doesn't exists");
    }
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
  next();
}
