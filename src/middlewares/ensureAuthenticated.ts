import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
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
    throw new AppError('JWT token is missing', 401);
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
      throw new AppError("User doesn't exists", 401);
    }
    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
